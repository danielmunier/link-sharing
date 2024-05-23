
import { getServerSession } from "next-auth";
import ProfileForm from "./components/ProfileForm";
import authConfig from "@/lib/auth";


export default async function ProfilePage() {
 
    const user = await getServerSession(authConfig)

  return (
    <div className="bg-gray-900 w-full h-screen">
        <ProfileForm sessionUserData={user}/>
    </div>
  );
}
