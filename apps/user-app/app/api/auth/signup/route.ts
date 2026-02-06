import { NextResponse } from "next/server";
import { client as db } from "@repo/db/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, password, name } = body; // We are getting 'phone' from the frontend

    if (!phone || !password) {
      return NextResponse.json(
        { message: "Missing Phone number or password" },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findFirst({
      where: { phone: phone }, //  if this PHONE already exists
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        phone: phone, 
        password: hashedPassword,
        name: name || "Anonymous",
        Balance: {

          create: {
            amount: 0,
            locked: 0
          }
        }
      },
    });

    return NextResponse.json({ message: "User Created successfully" });
  } catch (error: any) {

    console.error("SIGNUP ERROR:", error);

    return NextResponse.json(
      {
        message: "Error creating user",

        details: error.message,
      },
      { status: 500 }
    );
  }
}

