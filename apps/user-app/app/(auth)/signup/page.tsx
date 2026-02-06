"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp(){

    const router = useRouter();

    const [name , setName] = useState("");
    const [phone , setPhone] = useState("");
    const [password , setPassword] = useState("");

    const handleSignup = async ()=>{

        try{

            const response = await axios.post("/api/auth/signup",{

                name,
                phone,
                password
            });

            router.push("/api/auth/signin");
        }
        catch(error){

            console.error("SignUp failed:" , error);
            alert("SignUp failed. Phone number already taken ?");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
                
                {/* Name Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full p-2 border rounded"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

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
                    />
                </div>

                {/* Submit Button */}
                <button 
                    onClick={handleSignup}
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors"
                >
                    Sign Up
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Already have an account? <a href="/api/auth/signin" className="text-blue-600 hover:underline">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}