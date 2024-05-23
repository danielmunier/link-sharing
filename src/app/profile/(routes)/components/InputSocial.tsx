import { FaInstagram, FaDiscord, FaGithub, FaTiktok, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

export const InputSocial = ({ socialMediaName, onChange }: {socialMediaName: string, onChange: (e: any) => void}) => {
  const socialIcons = [
    { key: "Instagram", icon: <FaInstagram size="24" />, style: "text-red-500" },
    { key: "Discord", icon: <FaDiscord size="24" />, style: "text-blue-500" },
    { key: "Github", icon: <FaGithub size="24" />, style: "text-black" },
    { key: "Tiktok", icon: <FaTiktok size="24" />, style: "text-purple-500" },
    { key: "Twitter", icon: <FaTwitter size="24" />, style: "text-blue-500" },
    { key: "Facebook", icon: <FaFacebook size="24" />, style: "text-blue-500" },
    { key: "YouTube", icon: <FaYoutube size="24" />, style: "text-red-500" },
  ];

  const socialIcon = socialIcons.find(icon => icon.key === socialMediaName);

  return (
    <div className="flex items-center space-x-2">
      {socialIcon && (
        <>
          <span className={socialIcon.style}>{socialIcon.icon}</span>
          <input
            type="text"
            onChange={onChange}
            placeholder={socialIcon.key}
            className="pl-10 pr-4 py-2 bg-gray-700 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </>
      )}
    </div>
  );
};
