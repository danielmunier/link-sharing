import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb"
import GithubProvider from "next-auth/providers/github"



export const authConfig: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@gmail.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                console.log(credentials)
                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Email e senha são obrigatórios")
                }
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user.hashedPassword) {
                    throw new Error("Email não registrado")
                }
                
                const isCorrectPassword = user.hashedPassword === credentials.password ? user : false

                if(!isCorrectPassword) {
                    throw new Error("Senha incorreta")
                }

                return null

            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })

    ]
    
}

    export default authConfig