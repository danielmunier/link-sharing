import authConfig from "@/lib/auth";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req, res);
    const session = await getServerSession(req,res, authConfig)
    return NextResponse.json({ currentUser: session });
  } catch (e) {
    console.log(e);

    return NextResponse.json({ message: "Error trying to get session" }, {status: 400});
  }
}
