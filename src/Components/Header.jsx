import React, { useState } from "react";
import History from "./History";
import { useMediaQuery } from "react-responsive";
import favicon from "../assets/fevicon.png";

export default function Header({ setNewQuery, newQuery, setMessages }) {
  const [side, setSide] = useState(false);

  function toggleSidebar() {
    setSide(!side);
  }

  function ResponsiveText() {
    const isSmallScreen = useMediaQuery({ maxWidth: 500 });

    return (
      <div>
        {isSmallScreen ?"":"Clear History"}
      </div>
    );
  }

  return (
    <div>
      <header className="fixed z-20 w-full backdrop-blur-[3px]   bg-[#8EC5FF70] flex gap-4 items-center border-b-1 border-gray-200 justify-between    [@media(width<768px)]:justify-between p-4  [@media(width>768px)]:p-2 pt-4 pb-2 m-auto">
        <div className="[@media(width<768px)]:absolute">
          {/* <i
            onClick={toggleSidebar}
            className="text-xl text-gray-700 fa-solid fa-bars cursor-pointer"
          ></i> */}
        </div>

        <h1 className="flex items-center font-medium text-2xl md:ml-42  text-gray-800 " >
          <div className="bg-blue-400 rounded-full mr-2">
            <img
              className="w-8 min-w-8 "
              src={favicon}
              alt="logo"
            />
          </div>
          Sensei<span className="text-blue-500">Bot</span>
        </h1>
        <div className="flex gap-4  [@media(width>400px)]:gap-6 text-gray-700 items-center ml-4">
          <div
            onClick={() => {
              localStorage.clear();
              setMessages([]);
            }}
            className="text-center flex items-center justify-center [@media(width>400px)]:gap-2 bg-red-400 px-4 p-2 rounded-md  [@media(width>400px)]:text-md font-medium hover:bg-red-500 text-white cursor-pointer "
          >
            <i class="fa-solid fa-trash-can"></i><ResponsiveText/>
          </div>
          <i
            onClick={() => {
              setNewQuery(true);
              console.log(newQuery);
            }}
            className="text-xl md:pr-12 fa-regular fa-pen-to-square cursor-pointer"
          ></i>
        </div>
      </header>
      <div
        className={`transition-transform duration-300 ease-in-out ${
          side ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <History /> */}
      </div>
    </div>
  );
}
