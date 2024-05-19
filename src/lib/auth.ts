import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import GithubProvider from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log("authorize");
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) {
            console.log("Email e senha obrigatórios")
          throw new Error("Email e senha são obrigatórios");
        }
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
            console.log("Email não registrado")
          throw new Error("Email não registrado");
        }

        const isCorrectPassword =
          user.hashedPassword === credentials.password ? user : false;

        if (!isCorrectPassword) {
          throw new Error("Senha incorreta");
        }

        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async session({session, token}) {
        const user = await prismadb.user.findUnique({
            where: {
                email: session.user?.email || ""
            }
        })
        
        if(user && session && session.user) {
            session.user.name = user?.nickname
        }

        return session
  }

}}

export default authConfig;
