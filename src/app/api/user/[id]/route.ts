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

    const formData = await request.formData()
    const username = formData.get('username') as string
    const description = formData.get('description') as string 
    
    if (!params.id) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const existingUser = await prismadb.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Verificar se o usuário está tentando atualizar seu próprio perfil
    if (existingUser.email !== session.user.email) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updatedUser = await prismadb.user.update({
      where: { id: params.id },
      data: {
        username,
        description,
       
      },
      include: { socialMedia: true }, 
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[USER_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
