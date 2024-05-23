import { FaInstagram, FaDiscord, FaGithub, FaTiktok } from "react-icons/fa";

export const InputSocial = ({ socialMediaName, onChange }: {socialMediaName: string, onChange: (e: any) => void}) => {
  let socialIcons = [
    { key: "Instagram", icon: <FaInstagram size="24" /> },
    { key: "Discord", icon: <FaDiscord size="24" /> },
    { key: "Github", icon: <FaGithub size="24" /> },
    { key: "Tiktok", icon: <FaTiktok size="24" /> },
  ];

  return (
    <>
      <div className="flex flex-row items-center border-solid border-black border-2">
        {socialIcons.map((icon) => {
          if (icon.key === socialMediaName) {
            return (
              <>
                <span className="py-2 border-s ">{icon.icon}</span>
                <input
                  type="text"
                  onChange={onChange}
                  placeholder={icon.key}
                  className="h-full w-full"
                />
              </>
            );
          } else {
            return null
          }
        })}
      </div>
    </>
  );
};
