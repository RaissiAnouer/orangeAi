import React, { useState } from "react";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <div
        className={`${
          openSidebar
            ? " bg-orange-500/80 w-[100vw] md:w-[20vw] "
            : "w-[6vw] md:w-[2vw]"
        }  transition-all duration-300 ease-in-out pt-4`}
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
