import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth"; 
import { client as db } from "@repo/db/client"; 
import { redirect } from "next/navigation";

async function getBalance() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { amount: 0, locked: 0 };
  }

  const balance = await db.balance.findFirst({
    where: {
      userId: Number(session.user.id)
    }
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  };
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin"); // Standard NextAuth signin route
  }

  const balance = await getBalance();

  return (
    <div className="w-full">
      <div className="p-8">
        <h1 className="text-4xl text-[#6a51a6] font-bold mb-6">Dashboard</h1>
        
        {/* Max width limits the card size on large screens */}
        <div className="max-w-md"> 
            
            {/* Balance Card with Custom Styling */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Wallet Balance</h2>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-[#6a51a6]">
                        {/* Switched back to INR for consistency, change to '$' if you prefer */}
                        Rs {(balance.amount / 100).toFixed(2)}
                    </span>
                    <span className="text-gray-500 mb-2">INR</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                    Locked: Rs {(balance.locked / 100).toFixed(2)}
                </p>
            </div>

        </div>
      </div>
    </div>
  );
}