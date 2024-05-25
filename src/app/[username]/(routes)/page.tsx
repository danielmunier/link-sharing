import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/auth";
import { ErrorPage } from "@/components/error";
import Folder from "@/app/[username]/components/folder";
import SocialMediaLinks from "@/app/[username]/components/socialmedia-links";
import {
  FaTiktok,
  FaGithub,
  FaPinterest,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";
import { notFound } from 'next/navigation';
import prismadb from '@/lib/prismadb'


interface ProfilePageProps {
  params: {
    username: string;
  };
}

async function ProfilePage({ params }: ProfilePageProps) {

 

const currentUser = await prismadb.user.findFirst({
  where: {
    name: params.username,
  }, select: {
    name: true,
    profileImage: true,
    description: true,
    socialMedia: true,
    folders: true,

  }
})

  console.log(currentUser)

  if (!currentUser) {
    notFound();
  }

  const socialMediaLinks = [
    { name: "Tiktok", icon: <FaTiktok />, url: currentUser.socialMedia?.tiktok || "" },
    { name: "Instagram", icon: <FaInstagram />, url: currentUser.socialMedia?.instagram || "" },
    { name: "Github", icon: <FaGithub />, url: currentUser.socialMedia?.github || "" },
    { name: "Discord", icon: <FaDiscord />, url: currentUser.socialMedia?.discord || "" },
    { name: "Youtube", icon: <FaYoutube />, url: currentUser.socialMedia?.youtube || "" },
    { name: "Twitter", icon: <FaTwitter />, url: currentUser.socialMedia?.twitter || "" },
    { name: "Pinterest", icon: <FaPinterest />, url: currentUser.socialMedia?.pinterest || "" },
    { name: "Linkedin", icon: <FaLinkedin />, url: currentUser.socialMedia?.linkedin || "" },
  ];

  const foldersComponents = [
  ];

  return (
    <div className="py-4 bg-gray-900 h-full w-full">
      <div className="flex items-center justify-center h-screen">
        <div className="shadow-md bg-black w-11/12 max-w-lg px-2 rounded-lg p-4">
          <div className="flex flex-row items-center">
            <img
              src={currentUser.profileImage || "https://cdn.ayo.so/final/89f0052d-82a8-48f6-8006-6bc0ac7aaae3.webp"} // Use the user's profile image or a default image
              alt=""
              className="object-cover rounded-full border-black w-24 h-24"
            />
            <div className="flex flex-col ml-4">
              <span className="text-white text-xl text-bold">
                {currentUser.name}
              </span>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {currentUser.description || "No description yet."}
              </p>
            </div>
          </div>

          {/* <SocialMediaLinks links={socialMediaLinks} />  */}

          <div>
            {/* {foldersComponents.map(({ id, component }) => (
              <div key={id}>{component}</div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
