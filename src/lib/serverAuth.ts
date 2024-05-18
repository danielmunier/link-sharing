import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authConfig from "./auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const session = await getServerSession(authConfig);
    console.log(session)
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
