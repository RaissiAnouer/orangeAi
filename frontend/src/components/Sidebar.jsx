import React, { useState } from "react";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <div
        className={`${
          openSidebar
            ? " bg-[#FAFBFC] w-[100vw] md:w-[17vw] "
            : "w-[6vw] md:w-[2vw] border-none"
        }  transition-all duration-200 ease-in-out pt-4 border-r-1 border-gray-200 ml-4 `}
      >
        <div
          className={` ${
            openSidebar ? "flex items-center justify-between" : ""
          }`}
        >
          {openSidebar && (
            <h1 className="font-bold text-gray-700/80 text-3xl ">
              orange
              <span className=" text-orange-500">Ai</span>
            </h1>
          )}
          <img
            src={assets.menu}
            onClick={() => setOpenSidebar(!openSidebar)}
            className={`w-5 h-5 ${
              openSidebar ? " " : ""
            } transition-all duration-200 ease-in-out mx-2`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
