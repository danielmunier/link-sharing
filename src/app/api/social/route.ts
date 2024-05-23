// app/api/user/[id]/route.ts (Server Component)
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import authConfig from "@/lib/auth";
import { SocialMedia, User } from "@prisma/client";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authConfig);

        if (!session?.user) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        
        const socialMediaData: SocialMedia = await request.json();
        console.log(socialMediaData)
    
        // const updatedUser = await prismadb.user.update({
        //     where: {
        //       id: params.id,
        //     },
        //     data: {
        //       socialMedia: {
        //         upsert: {
        //           create: socialMediaData,
        //           update: socialMediaData,
        //         },
        //       },
        //     },
        //     include: { socialMedia: true } 
        //   });
        return NextResponse.json({});
    } catch (error) {
        console.log("[USER_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
