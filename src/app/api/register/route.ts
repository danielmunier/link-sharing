// import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from "@/lib/prismadb"
import * as z from "zod"
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authConfig from '@/lib/auth';


const userSchema = z.object({
    username: z
    .string()
    .min(1, "Username is required")
    .max(100)
    .refine((username) => /^[\w-]+$/.test(username), {
      message: "Username must only contain letters, numbers, underscores, and hyphens",
      path: ["username"],
    }),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
  });


export async function POST(req: Request) {
    const session = await getServerSession(authConfig);
    if (session?.user) {
        return new NextResponse("Authenticed already", { status: 401 });
    }
    

    const body = await req.json()

    

    try {
        const {email, username, password} = userSchema.parse(body)
        console.log(username)
     


        const existingUser = await prismadb.user.findUnique({
            where: {
                email: email
            }
        })

        const existingUsername = await prismadb.user.findFirst({
            where: {
                username: username
            }
        })


        if(existingUser) {
            return NextResponse.json({error: "Email already in use"}, {status: 409})
        }

        if(existingUsername) {
            return NextResponse.json({error: "Nickname already in use"}, {status: 409})
        }

       // const hashedPassword = await bcrypt.hash(password, 12)
       const hashedPassword = password

        const newUser = await prismadb.user.create({
            data: {
               email,
               hashedPassword,
               username,
               profileImage: ""
               
            }
        })

        console.log(newUser)
        await prismadb.socialMedia.create({
            data: {
                
                userId: newUser.id
            }
        })
   
        return NextResponse.json(newUser, {status: 200})

    }catch(e) {
        console.log(e)
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}