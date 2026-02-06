"use client";

import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0);

    return (
        <div className="border p-6 rounded-xl bg-[#ededed]">
            <h2 className="text-xl font-bold mb-4">Add Money</h2>
            <div className="w-full">
                {/* Amount Input */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                    <input 
                        type="number" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="Amount" 
                        onChange={(e) => setValue(Number(e.target.value))} 
                    />
                </div>

                {/* Bank Selector */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Bank</label>
                    <select 
                        onChange={(e) => {
                            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === e.target.value)?.redirectUrl || "");
                            setProvider(SUPPORTED_BANKS.find(x => x.name === e.target.value)?.name || "");
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        {SUPPORTED_BANKS.map(x => <option key={x.name} value={x.name}>{x.name}</option>)}
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                    <button 
                        onClick={async () => {
                            await createOnRampTransaction(provider, value);
                            window.location.href = redirectUrl || "";
                        }} 
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                        Add Money
                    </button>
                </div>
            </div>
        </div>
    );
};