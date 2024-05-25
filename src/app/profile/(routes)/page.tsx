
import { getServerSession } from "next-auth";
import ProfileForm from "./components/ProfileForm";
import authConfig from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";


export default async function ProfilePage() {
 
    const session = await getServerSession(authConfig)
    
  return (
    <div className="bg-gray-900 w-full h-screen">
      <Navbar/>
        <ProfileForm sessionUserData={session}/>
    </div>
  );
}
