"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Appbar = () => {
  const session = useSession();
  const user = session.data?.user;

  return (

    <div className="flex justify-between border-b px-4 py-2 border-slate-300 items-center bg-white shadow-sm">
      
      <Link href="/dashboard" className="text-xl font-bold flex flex-col justify-center text-slate-800">
        EzzyPay
      
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
      
      <div className="flex gap-4 items-center">
      
            <span className="text-sm font-semibold text-slate-700">{user.name}</span>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={() => signOut({ callbackUrl: "/signin" })}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
      
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      
          onClick={() => signIn()}
          >
            Login
          </button>
        )}
      
      </div>
    </div>
  );
};