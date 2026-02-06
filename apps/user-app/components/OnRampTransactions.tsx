import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string,
        type: string // Added this new field
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between border-b pb-2 mb-2">
                <div>
                    <div className="text-sm font-semibold">
                        {t.type === "bank_deposit" ? "Added from Bank" : 
                         t.type === "p2p_sent" ? "Sent INR" : "Received INR"}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className={`flex flex-col justify-center ${t.type === 'p2p_sent' ? 'text-red-500' : 'text-green-500'}`}>
                    {t.type === 'p2p_sent' ? '-' : '+'} Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}