"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninPage(){

    const router = useRouter();

    const [phone , setPhone] = useState("");

    const [password , setPassword] = useState("");

    const [loading , setLoading] = useState(false);

    const [error , setError] = useState("");

    const handleSignin = async () => {

        setError("");

        setLoading(true);

        const res = await signIn("credentials",{

            phone: phone,
            password: password,
            redirect: false,
        });

        setLoading(false);

        if(res?.error){

            setError("Invalid phone number or password");
        }

        else {
            
            router.push("/dashboard");
        }
    };

    return (

        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
                
                {/* Error Message Display */}
                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded text-center">
                        {error}
                    </div>
                )}

                {/* Phone Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input 
                        type="text" 
                        placeholder="1234567890" 
                        className="w-full p-2 border rounded"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••" 
                        className="w-full p-2 border rounded"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSignin();
                        }}
                    />
                </div>

                {/* Submit Button */}
                <button 
                    onClick={handleSignin}
                    disabled={loading}
                    className={`w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}