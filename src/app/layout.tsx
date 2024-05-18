
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider, { NextAuthProvider } from "@/components/serverProvider";
import { getServerSession } from "next-auth";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
title: "Create Next App",
  description: "Generated by create next app",
};




const App =  async ({
 children
}: React.PropsWithChildren
) => {

  const session = await getServerSession()
  console.log(session)

  return (
    <html>
      <body>
         <main>
    <SessionProvider>
    {children}

    </SessionProvider>
         </main>

      </body>
    </html>
  )

}

export default App