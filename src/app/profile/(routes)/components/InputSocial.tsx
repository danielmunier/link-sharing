import React, { useState } from "react";
import {
  FaInstagram,
  FaDiscord,
  FaGithub,
  FaTiktok,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";

export const InputSocial = ({ socialMediaApp, onChange, value }: {
  socialMediaApp: string;
  onChange: (value: { name: string; value: string }) => void;
  value: string;
}) => {
  const socialIcons = [
    {
      key: "instagram",
      icon: <FaInstagram size="24" />,
      style: "text-red-500",
    },
    { key: "discord", icon: <FaDiscord size="24" />, style: "text-blue-500" },
    { key: "github", icon: <FaGithub size="24" />, style: "text-black" },
    { key: "tiktok", icon: <FaTiktok size="24" />, style: "text-purple-500" },
    { key: "twitter", icon: <FaTwitter size="24" />, style: "text-blue-500" },
    { key: "facebook", icon: <FaFacebook size="24" />, style: "text-blue-500" },
    { key: "youtube", icon: <FaYoutube size="24" />, style: "text-red-500" },
    {key: "pinterest", icon: <FaPinterest size="24" />, style: "text-red-500"}
  ];

  const socialIcon = socialIcons.find((icon) => icon.key === socialMediaApp);
  return (
    <div className="flex items-center space-x-2">
      {socialIcon && (
        <>
          <span className={socialIcon.style}>{socialIcon.icon}</span>
          <input
            type="text"
            onChange={(e) =>
              onChange({ name: socialMediaApp, value: e.target.value })
            }
            placeholder={socialIcon.key}
            value={value}
            className="pl-10 pr-4 py-2 bg-gray-700 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </>
      )}
    </div>
  );
};
