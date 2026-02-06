import {client as db} from "@repo/db/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request)=>{

    const body = await req.json();

    const paymentInformation = {

        token : body.token,
        userId : body.user_identifier,
        amount: body.amount
    };

    try {

        await db.$transaction([

            // 1. updating user balance

            db.balance.updateMany({

                where:{

                    userId: Number(paymentInformation.userId)
                },

                data:{

                    amount: {

                        increment: Number(paymentInformation.amount)
                    }
                }

            }),

            // updating transaction status

            db.onRampTransaction.updateMany({

                where: {

                    token: paymentInformation.token
                },

                data:{

                    status: "Success",
                }
            })
        ]);

        return NextResponse.json({

            message: "Captured"
        })
    }

    catch(e){

        console.error(e);

        return NextResponse.json({

            message: "Error while capturing"
        }, {

            status: 411
        })
    }
}