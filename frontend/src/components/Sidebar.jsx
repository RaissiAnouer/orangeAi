import React, { useState } from "react";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <div
        className={`${
          openSidebar
            ? " bg-[#FAFBFC] w-[100vw] md:w-[17vw] border-r-1 border-gray-200 "
            : "w-[6vw] md:w-[2vw]"
        }  transition-all duration-100 ease-in-out pt-4`}
      >
        <img
          src={assets.menu}
          onClick={() => setOpenSidebar(!openSidebar)}
          className="w-6 h-6 m-3"
          alt=""
        />
      </div>
    </>
  );
};

export default Sidebar;
