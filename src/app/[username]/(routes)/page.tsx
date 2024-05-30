import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/auth";
import { ErrorPage } from "@/components/error";
import Folder from "@/app/[username]/components/folder";
import SocialMediaLinks from "@/app/[username]/components/socialmedia-links";
import prismadb from "@/lib/prismadb";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

async function ProfilePage({ params }: ProfilePageProps) {
  const currentUser = await prismadb.user.findFirst({
    where: {
      name: params.username,
    },
    select: {
      name: true,
      profileImage: true,
      description: true,
      socialMedia: true,
      folders: true,
    },
  });

  if (!currentUser) {
    return <ErrorPage />;
  }





  return (
    <div className="py-4 bg-gray-900 h-full w-full bg-[url('https://cdn.ayo.so/final/fe7eb772-2b07-429e-b989-90392c37ed32.webp')] bg-cover">
      <div className="flex items-center justify-center h-screen">
        <div className="shadow-md bg-black w-11/12 max-w-lg px-2 rounded-lg p-4">
          <div className="flex flex-row items-center">
            <img
              src={
                currentUser.profileImage ||
                "https://avatars.githubusercontent.com/u/63890469?v=4"
              } 
              alt="User profile picture"
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

          <SocialMediaLinks networkUser={currentUser.socialMedia} />

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
