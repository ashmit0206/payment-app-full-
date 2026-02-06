"use client"
import { signOut } from "next-auth/react"

export const SignoutButton = ()=>{

    return (

        <button
          onClick={()=>{signOut({callbackUrl:"/signin"})}}

          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">

            Sign Out

        </button>
    );
};