
import Folder from "@/components/folder";
import SocialMediaLinks from "@/components/socialmedia-links";
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

interface ProfilePageProps {
  params: {
    userId: string;
    username: string;
    description: string;
    socialNetwork: string[];
  };
}

interface FolderItem {
  name: string;
  content: string[];
  folderState: "visible" | "hidden"; // Adjusted the type here
  contentState: "visible" | "hidden"; // Adjusted the type here
}

const DashboardPage: React.FC<ProfilePageProps> = async ({ params }) => {
  const username = params.username;
  const profileOrigin = "";
  const description = "Something cool here";

  const socialMedia = [
    {
      name: "Tiktok",
      icon: <FaTiktok />,
      url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },

    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    {
      name: "Github",
      icon: <FaGithub />,
      url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    {
      name: "Discord",
      icon: <FaDiscord />,
      url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    {
      name: "Youtube",
      icon: <FaYoutube />,
      url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    {
      name: "Pinterest",
      icon: <FaPinterest />,
      url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    {
      name: "Linkedin",
      icon: <FaLinkedin />,
      url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
  ];




 

  const foldersComponents = [
    <Folder name="Projetos" content={["Teste", "Item 2"]}  />,
    <Folder name="Musicas" content={["Item 1", "Item 2"]}  />,
    <Folder name="Projetos" content={["Item 1", "Item 2"]}  />,
  ]
  
 



 

  return (
    <div className="py-4 bg-slate-400 h-full w-full">
      <div className="flex items-center justify-center h-screen">
        <div className="shadow-md bg-black w-11/12 max-w-lg px-2 border-2 border-white rounded-lg">
          // profile
          <div className="flex flex-row items-center">
            <img
              src="https://cdn.ayo.so/final/89f0052d-82a8-48f6-8006-6bc0ac7aaae3.webp"
              alt=""
              className="object-cover rounded-full border-black w-24 h-24 "
            />
            <div className="flex flex-col ml-4">
              <span className="text-white text-xl text-bold">{username}</span>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {profileOrigin}
              </p>
            </div>
          </div>
          <p className="text-gray-500 m-5"> {description}</p>
          <SocialMediaLinks links={socialMedia} />
         <div>
         {
             foldersComponents.map((folderComponent, index) => (
              <div key={index}>
                {folderComponent}
              </div>
            ))
          }

         </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
