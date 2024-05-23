import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authConfig from "./auth";
import prismadb from "./prismadb"
import { getSession } from "next-auth/react";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const session = await getSession();
    if (!session?.user?.email) {
  
      return {message: "No session"}
    }
    
    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
  
  
    if (!currentUser) {
      console.log("I didn't found the user in database")
      return { currentUser: "Not found" };
      
    }
  
    return { currentUser };
  };

export default serverAuth
