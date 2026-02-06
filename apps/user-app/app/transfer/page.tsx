import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { client as db } from "@repo/db/client";
import { AddMoney } from "../../components/AddMoneyCard";
import { OnRampTransactions } from "../../components/OnRampTransactions";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await db.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    // 1. Fetching Bank Transfers
    const bankTransfers = await db.onRampTransaction.findMany({
        where: {
            userId: userId
        }
    });

    // 2. Fetching P2P Transfers (Sent and Received)
    const sentTransfers = await db.p2pTransfer.findMany({
        where: {
            fromUserId: userId
        }
    });

    const receivedTransfers = await db.p2pTransfer.findMany({
        where: {
            toUserId: userId
        }
    });

    // 3. Formating and Merging
    const formattedBank = bankTransfers.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
        type: "bank_deposit"
    }));

    const formattedSent = sentTransfers.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        status: "Success",
        provider: "P2P Transfer",
        type: "p2p_sent"
    }));

    const formattedReceived = receivedTransfers.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        status: "Success",
        provider: "P2P Transfer",
        type: "p2p_received"
    }));

    // Combining all and sort by date (newest first)
    return [...formattedBank, ...formattedSent, ...formattedReceived].sort((a, b) => 
        b.time.getTime() - a.time.getTime()
    );
}

export default async function TransferPage() {
    const balance = await getBalance();
    const transactions = await getTransactions();

    return (
        <div className="w-screen min-h-screen bg-gray-50">
            
            <div className="pt-8 mb-8 font-bold text-4xl text-[#6a51a6] px-10">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoney />
                </div>
                <div>
                    <div className="pt-4">
                        <OnRampTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}