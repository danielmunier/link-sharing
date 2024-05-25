import { SocialMedia } from "@prisma/client";
import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string 
      email: string
      image: string 
      description: string 
      socialMedia:  SocialMedia[] | any
    };
  }
}