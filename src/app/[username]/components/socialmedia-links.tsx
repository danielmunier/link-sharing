import { SocialMedia, User } from "@prisma/client";
import React from "react";
import {
  FaTiktok,
  FaInstagram,
  FaGithub,
  FaDiscord,
  FaYoutube,
  FaTwitter,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";

interface SocialMediaLink {
  name: string;
  icon: React.ReactNode;
  url: string;
}


const SocialMediaLinks= ({ networkUser }: 
  {
    networkUser: any
  }
) => {
  
    const iconMap = [
      { name: "tiktok", icon: <FaTiktok />, url: networkUser.tiktok },
      { name: "instagram", icon: <FaInstagram />, url: networkUser.instagram },
      { name: "github", icon: <FaGithub />, url: networkUser.github },
      { name: "discord", icon: <FaDiscord />, url: networkUser.discord },
      { name: "youtube", icon: <FaYoutube />, url: networkUser.youtube },
      { name: "twitter", icon: <FaTwitter />, url: networkUser.twitter },
      { name: "pinterest", icon: <FaPinterest />, url: networkUser.pinterest },
      { name: "linkedin", icon: <FaLinkedin />, url: networkUser.linkedin },
    ]

  

    const socialMediaUser = iconMap.filter(social => social.url !== null)
    console.log(socialMediaUser)

  return (
    <div className="flex flex-row gap-3 m-5 items-center"> 
      {socialMediaUser.map((link) => 
      (
        <a
          href={link.url}
          key={link.name}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 transition-colors duration-200" 
        >
          <span className="text-2xl">
            {link.icon}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
