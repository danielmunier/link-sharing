// app/api/user/[id]/route.ts
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }


    const authenticatedUser = await prismadb.user.findFirst({
      where: {
        email: session.user.email,
      },
    })



     

    const formData = await request.formData()
    const formName = formData.get('name') as string
    const formDescription = formData.get('description') as string 
    
   
    const socialLinks = {
      instagram: formData.get('instagram') as string || null,
      discord: formData.get('discord') as string || null,
      github: formData.get('github') as string || null,
      tiktok: formData.get('tiktok') as string || null,
      twitter: formData.get('twitter') as string || null,
      youtube: formData.get('youtube') as string || null,
      pinterest: formData.get('pinterest') as string || null,

    };

    console.log(socialLinks)

    const existingUser = await prismadb.user.findUnique({
      where: { id: authenticatedUser?.id },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (existingUser.email !== session.user.email) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updatedUser = await prismadb.user.update({
      where: { id: authenticatedUser?.id },
      data: {
        name: formName,
        description: formDescription,
       socialMedia: {
          update: socialLinks
       }
      },
      include: { socialMedia: true }, 
    });


    return new NextResponse("Usuário alterado com sucesso!", {status: 200});
  } catch (error) {
    console.log("[USER_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
