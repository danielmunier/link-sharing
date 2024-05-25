import authConfig from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface PrivateAuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: PrivateAuthLayoutProps) {

    const session = await getServerSession(authConfig)
    if(session) {
        redirect("/")
    }

  return <div>
    {children}
  </div>;
}
