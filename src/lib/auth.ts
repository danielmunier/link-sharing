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
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Credenciais inválidas");
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          throw new Error("Email não registrado");
        }

        if (user.hashedPassword !== credentials.password) {
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
  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ session, user, token }) {
      if (session && user) {
        session.user = token.user;
        user && (token.user = user);
      }
      

      return token;
    },
    async session({ session, token }) {
      if (session) {
        const currentUser = await prismadb.user.findUnique({
          where: {
            id: token.sub,
          },
          select: {
            id: true,
            email: true,
            name: true,
            profileImage: true,
            description: true,
            socialMedia:{
              select: {
                tiktok: true,
                instagram: true,
                github: true,
                discord: true,
                youtube: true,
                twitter: true,
                pinterest: true,
                linkedin: true,
              }
            }
          
          },
        });

        if(!currentUser) return session

        session.user = {
          name: currentUser?.name,
          email: currentUser?.email,
          image: currentUser?.profileImage || "",
          description: currentUser?.description || "",
          socialMedia: currentUser?.socialMedia || []
        }
        }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
};

export default authConfig;
