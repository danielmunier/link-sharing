"use client";

import { useState } from "react";
import { FaFolder } from "react-icons/fa";

interface FolderProps {
  name: string;
  content: string[];
}

const Folder: React.FC<FolderProps> = ({
  name,
  content = ["Item 1", "Item 2"],
}) => {


  const [openFolder, setOpenFolder] = useState("hidden")

  const handleClickFolder = () => {
    setOpenFolder(openFolder === "visible" ? "hidden" : "visible" )

  }

  return (
    <div
      onClick={handleClickFolder}
      className={`rounded w-full bg-gray-950 mb-1 text-sm shadow cursor-pointer bg-gradient-to-r  via-zinc-600 to-zinc-900 bg-animate group`}
    >
      <div className=" rounded flex flex-row items-center">
        <div className="p-5 rounded bg-zinc-800 to-zinc-900 text-zinc-300 w-14 flex items-center justify-center">
          <FaFolder />
        </div>
        <div
          className="
        text-white
        ml-5
        "
        >
          {name}
        </div>
      </div>
      <div >
        {content.map((item) => {
          return (
            <ul className={` ${openFolder}`}>
              <li className="text-red-300">{item}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Folder;
