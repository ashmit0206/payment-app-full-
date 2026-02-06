import {client as db} from "@repo/db/client"
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt  from "bcryptjs";

export const authOptions: NextAuthOptions = {

    providers: [

        CredentialsProvider({

            name: 'Credentials',

            credentials:{

                phone: {label: "Phone number" , type: "text" , placeholder: "123123"},
                password:{label: "Password" , type: "password"}
            },

            async authorize(credentials: any){

                if(!credentials || !credentials.phone || !credentials.password){

                    return null;
                }

                const existingUser = await db.user.findFirst({

                    where: {

                        phone: credentials.phone
                    }
                });

                if(existingUser){

                    const passwordValidation = await bcrypt.compare(credentials.password , existingUser.password);
                
                    if(passwordValidation){

                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }

                    return null;
                }

                return null;

            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET || "secret",
    
    callbacks: {

        async session({session , token}: any){

            if(session.user){

                session.user.id = token.sub;
            }

            return session;
        }
    },

    session: {

        strategy: "jwt",
        maxAge: 60 * 60 ,
    },

    jwt: {

        secret: process.env.NEXTAUTH_SECRET || "secret",
    },

    pages:{

        signIn: "/signin",
    }
}