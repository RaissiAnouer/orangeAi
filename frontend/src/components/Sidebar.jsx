import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { name, picture } = useContext(Context);
  return (
    <>
      <div
        className={`${
          openSidebar
            ? " bg-[#FAFBFC] w-[100vw] md:w-[17vw] "
            : "w-[6vw]  border-none"
        }  transition-all duration-100 ease-in-out pt-4 border-r-1 border-gray-200  px-2`}
      >
        <div className="flex flex-col h-full  ">
          <div className="flex items-center justify-between">
            <h1
              className={`font-bold text-gray-700/80 text-3xl ${
                openSidebar ? "" : "hidden"
              }`}
            >
              orange
              <span className=" text-orange-500">Ai</span>
            </h1>
            <img
              src={assets.menu}
              onClick={() => setOpenSidebar(!openSidebar)}
              className={`w-5 h-5 ${
                openSidebar ? " " : ""
              } transition-all duration-200 ease-in-out mx-2`}
              alt=""
            />
          </div>
          <button
            className={`${
              openSidebar
                ? "mt-auto text-sm mb-3 w-full py-2 hover:bg-gray-500/10 rounded-2xl cursor-pointer flex justify-between items-center px-3"
                : "hidden"
            }`}
          >
            <div className="flex items-center gap-2">
              {" "}
              <img
                className="rounded-full w-9 h-9 border-[1px] border-gray-300"
                src={picture}
                alt=""
              />
              <p className=" text-gray-700/80 text-base font-medium">{name}</p>
            </div>
            <img className="w-4 h-4" src={assets.dots} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
