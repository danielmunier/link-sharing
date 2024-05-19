// import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from "@/lib/prismadb"
import * as z from "zod"
import { NextResponse } from 'next/server';


const userSchema = z.object({
    nickname: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
  });


export async function POST(req: Request) {
    const body = await req.json()
    

    try {
        const {email, nickname, password} = userSchema.parse(body)
     


        const existingUser = await prismadb.user.findUnique({
            where: {
                email: email
            }
        })

        const existingNickname = await prismadb.user.findFirst({
            where: {
                nickname: nickname
            }
        })


        if(existingUser) {
            return NextResponse.json({error: "Email already in use"}, {status: 409})
        }

        if(existingNickname) {
            return NextResponse.json({error: "Nickname already in use"}, {status: 409})
        }

       // const hashedPassword = await bcrypt.hash(password, 12)
       const hashedPassword = password


        const newUser = await prismadb.user.create({
            data: {
               email,
               hashedPassword,
               nickname
            }
        })

        return NextResponse.json(newUser, {status: 200})

    }catch(e) {
        console.log(e)
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}