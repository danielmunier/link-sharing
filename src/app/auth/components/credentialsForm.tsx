"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Component, useCallback, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import * as z from "zod";



interface CredentialsFormProps {
  csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [variant, setVariant] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "signup" : "login"
    );
  }, []);


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value.replace(/\s+/g, '');
    setName(newUsername);
    console.log(name)

    const isValid = /^\w[-]+$/.test(newUsername);
    setError(isValid ? null : "Username must only contain letters, numbers, underscores, hyphens and no spaces");
  };

  const login = useCallback(async () => {
    try {
      const signInData = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (e) {
      console.log("Error trying to login");
      console.log(e);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      const registerData = await axios.post("/api/register", {
        email,
        name: name,
        password,
      });
      console.log("Successfull register");
      router.push("/");
    } catch (e) {
      console.log("Error trying to register");
      console.log(e);
    }
  }, [email, name, password]);

  return (
    <div className="bg-gray-800 p-8 rounded shadow-md w-96">
      <form>
        {error}
        <div className="mb-4">
          {variant === "signup" && (
            <>
              <label className="block text-sm font-bold mb-2">Username</label>
              <div className="flex items-center p-1">
                  <span className="flex-shrink-0 bg-white px-2 py-2 border-s text-sm font-medium text-gray-700">this.site/</span>
                  <input
                onChange={handleNameChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="username"
                
              />

              </div>
            </>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={variant === "login" ? login : register}
          >
            {variant === "login" ? "Login" : "Register"}
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
            onClick={() => toggleVariant()}
          >
            {variant === "login" ? "Criar uma conta" : "Faça login"}
          </a>
       
        </div>
      </form>
    </div>
  );
}
