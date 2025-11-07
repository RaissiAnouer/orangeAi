import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { setToken, token, backendUrl, startNewConversation } =
    useContext(Context);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openProfil, SetOpenProfil] = useState(false);
  const dropdownRef = useRef(null);
  const { name, picture } = useContext(Context);
  const [conversation, setConversation] = useState([]);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      SetOpenProfil(false);
    }
  };

  const getConv = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/conversation", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setConversation(response.data.conversation);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const delConv = async (id) => {
    try {
      const response = await axios.delete(
        backendUrl + `/api/conversation/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getConv();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    handleClickOutside;
    if (openProfil) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfil]);

  useEffect(() => {
    getConv();
  }, [startNewConversation]);

  useEffect(() => {
    getConv();
  }, []);

  return (
    <>
      <div
        className={`${
          openSidebar
            ? "  bg-[#FAFBFC] md:w-[17vw] "
            : "sm:w-[6vw]  border-none"
        }  transition-all duration-100 ease-in-out pt-4 border-r-1 border-gray-200  px-2`}
      >
        <div className="flex flex-col justify-between h-full  ">
          <div className="flex items-center justify-between">
            <h1
              className={`font-bold text-gray-700/80 text-xl sm:text-3xl ${
                openSidebar ? "" : "hidden"
              }`}
            >
              orange
              <span className=" text-orange-500">Ai</span>
            </h1>
            <div className="flex items-center gap-3 mx-2">
              <img
                src={assets.logo}
                className={`w-5 h-5 ${openSidebar ? "hidden" : ""}`}
                alt=""
              />
              <img
                src={assets.menu}
                onClick={() => setOpenSidebar(!openSidebar)}
                className={`w-5 h-5 ${
                  openSidebar ? " " : ""
                } transition-all duration-200 ease-in-out  cursor-pointer`}
                alt=""
              />
            </div>
          </div>
          <button
            className={`${
              openSidebar
                ? " w-full py-2 bg-white shadow-sm rounded-full cursor-pointer font-medium text-gray-700 border border-1 border-gray-200/80"
                : "hidden"
            } `}
          >
            New Chat
          </button>
          <div
            className={`${
              openSidebar ? "h-[70%]  overflow-y-auto w-full" : "hidden"
            }`}
          >
            {conversation.map((cnv, idx) => (
              <div className="relative group w-full " key={idx}>
                <div
                  className={` flex items-center justify-between ${
                    userId === cnv.id
                      ? "bg-gray-500/10"
                      : "hover:bg-gray-500/10 "
                  }  cursor-pointer py-2 px-2 rounded-lg`}
                >
                  <p className="truncate">{cnv.title}</p>
                  <div className="relative">
                    <button
                      type="button"
                      className={` ${
                        userId === cnv.id ? "block" : "hidden group-hover:block"
                      }
                          rounded-full cursor-pointer my-auto hover:bg-gray-500/10 `}
                      onClick={() => {
                        setOpen(!open);
                        setUserId(userId === null ? cnv.id : null);
                        console.log(cnv.id);
                      }}
                    >
                      ...
                    </button>
                    {open && userId === cnv.id && (
                      <div>
                        <div className="absolute top-full right-0 z-50 shadow-md flex flex-col gap-2 items-center bg-white p-1 rounded-lg border-gray-200 border border-1  ">
                          <div className="w-full p-2 pr-8 flex gap-2 items-center hover:bg-gray-400/10 rounded-md">
                            <img
                              className="w-4 h-4"
                              src={assets.rename}
                              alt=""
                            />
                            <p className="text-gray-700 text-base">Rename</p>
                          </div>
                          <button
                            className="w-full p-2 cursor-pointer  flex gap-2 items-center  rounded-md hover:bg-red-100/60"
                            onClick={() => delConv(cnv.id)}
                          >
                            <img className="w-4 h-4" src={assets.bin} alt="" />
                            <p className="text-[#ff0000] text-base">Delete</p>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => SetOpenProfil(!openProfil)}
              className={`${
                openSidebar
                  ? "mt-auto text-sm mb-3 w-full py-2 hover:bg-gray-500/10 rounded-2xl cursor-pointer flex justify-between items-center px-3"
                  : "hidden"
              }`}
            >
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full w-9 h-9 border-[1px] border-gray-300"
                  src={picture || null}
                  referrerPolicy="no-referrer"
                  alt=""
                />
                <p className=" text-gray-700/80 text-base font-medium">
                  {name}
                </p>
              </div>
              <img className="w-4 h-4" src={assets.dots} alt="" />
            </div>
            {openProfil && (
              <div className="absolute bottom-full mt-1 w-full bg-white  border-[1px]   border-gray-200  shadow-md rounded-lg ">
                <div
                  onClick={logout}
                  className=" rounded-lg hover:bg-gray-200 w-full text-start p-2 cursor-pointer flex items-center gap-2 "
                >
                  <img className="w-5 h-5" src={assets.logout} alt="" />
                  <p>Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
