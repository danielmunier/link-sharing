"use client"

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { Component, useState } from 'react'

interface CredentialsFormProps {
    csrfToken?: string
}

export async function CredentialsForm(props: CredentialsFormProps) {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        const signInResponse = await signIn("credentials", {
            email: data.get("email"),
            password: data.get("password"),
            redirect: false
        }
        )

        
        if(signInResponse && !signInResponse.error) {
            router.push(`/${data.get("email")}`)
        } else {
            console.log("Something went wrong")
            setError("Something went wrong " + signInResponse?.error )
        }
        }

        return (
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        )

    }

