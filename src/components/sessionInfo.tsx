"use client"

import { getServerSession } from "next-auth"
import { Button } from "./Button"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"


export const SessionInfo = () => {
    const {data: session, status} = useSession()
    if(status === "loading") return <div>Loading...</div>
    if(!session) return (
        <Button text="Login" href="/auth"/>
    ) 
    
    

    return (
        <div className="flex flex-col">
           <a href={`/${session.user?.name}`}>{session.user?.name}</a>
            
          
                    <div>
                    <Button className="w-full" text="Logout" href="/api/auth/signout"/>
                    </div>
          
        </div>
    )
}
    