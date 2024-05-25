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

interface SocialMediaLinksProps {
  links: SocialMediaLink[];
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ networkUser }) => {
    const iconMap: Record<string, React.ReactNode> = {
        Tiktok: <FaTiktok />,
        Instagram: <FaInstagram />,
        Github: <FaGithub />,
        Discord: <FaDiscord />,
        Youtube: <FaYoutube />,
        Twitter: <FaTwitter />,
        Pinterest: <FaPinterest />,
        Linkedin: <FaLinkedin />,
      };

  return (
    <div className="flex flex-row gap-3 m-5 items-center"> 
      {iconMap.map((link) => (
        <a
          href={link.url}
          key={link.name}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 transition-colors duration-200" // Added hover and transition effects
        >
          <span className="text-2xl"> {/* Increased icon size */}
            {link.icon}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
