"use client";

import { useState } from "react";
import { Button } from "./Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const SessionInfo = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  
  if (status === "loading") return <div>Loading...</div>;
  if (!session)
    return <Button text="Login" href="/auth" />;

  return (
    <div className="relative inline-block text-left">
      <Button
        text={session?.user?.name || "Profile"}
        className="px-4 py-2 rounded-md hover:bg-gray-700 text-white"
        onClick={() => setIsOpen(!isOpen)} 
      />

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Link
              href={`/${session.user?.name}/`}
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {`site.com/${session.user?.name}`}
            </Link>
            <Link
              href={`/profile`}
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
                Perfil
            </Link>
            <Button
              text="Logout"
              href="/api/auth/signout"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
