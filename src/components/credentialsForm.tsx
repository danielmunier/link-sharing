"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Component, useCallback, useState } from "react";
import Input from "./Input";
import { getServerSession } from "next-auth";
import authConfig from "@/lib/auth";

interface CredentialsFormProps {
  csrfToken?: string;
}



export function CredentialsForm(props: CredentialsFormProps) {
  

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [variant, setVariant] = useState("login");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "signup" : "login"
    );
  }, []);

  const login = useCallback(async () => {

    try {
      const signInData = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      })

      console.log(signInData)
    } catch (e) {
      console.log("Error trying to login");
      console.log(e);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      const registerData = await axios.post("/api/register", {
        email,
        nickname,
        password,
      });
      console.log("Successfull register");
      console.log(registerData)
      router.push("/");
    } catch (e) {
      console.log("Error trying to register");
      console.log(e);
    }
  }, [email, nickname, password]);

  return (
    <div className="relative h-full w-full">
      <div className="bg-slate-400 w-full h-full lg:bg-opacity-90">
        <div className="flex justify-center">
          <div className="px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-black text-5lx mb-5 font-semibold">
              {variant === "login" ? "Sign in" : "Create an account"}
            </h1>

            <div className="flex flex-col gap-4">
              {variant === "signup" && (
                <Input
                  label="Name"
                  onChange={(ev: any) => setNickname(ev.target.value)}
                  id="name"
                  type="name"
                  value={nickname}
                />
              )}

              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover: bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Register"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center"></div>

            <p className="text-neutral-500 mt-5">
              {variant === "login"
                ? "Registre-se agora "
                : "Já possui uma conta? "}
              <span
                onClick={toggleVariant}
                className="text-white cursor-pointer"
              >
                {variant === "login" ? "Sign up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
