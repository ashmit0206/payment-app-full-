"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import {client as db} from "@repo/db/client";
import { redirect } from "next/navigation";

export  async function  createOnRampTransaction(provider: string , amount: number){

    const session = await getServerSession(authOptions);

    if(!session?.user || !session.user.id){

        return {

            message: "Unauthenicated request"
        }
    }
    // we are using random token but this should come from the bank  in real world

    const token = (Math.random() * 1000).toString();

    await db.onRampTransaction.create({

        data: {

            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session.user.id),
            amount: amount * 100 // converting Rs to paisa to avoid decimal
        }
    });

    return {
        
        message: "Done"

    }
}