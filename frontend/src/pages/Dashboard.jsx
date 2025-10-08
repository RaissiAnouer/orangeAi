import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";
import axios from "axios";
import { Context } from "../../context/context";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { setMessage, onSubmitHandler, reply } = useContext(Context);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full  mt-3 ml-10">
        <div className="flex justify-between w-full">
          <div className="flex gap-8 items-center">
            <h1 className="font-bold text-gray-700/80 text-xl ">
              orange
              <span
                className="
        text-orange-500"
              >
                Ai
              </span>
            </h1>
          </div>
          <img src={assets.avatar} className="h-10 w-10" alt="" />
        </div>
        <div className="w-[59vw] bg-red-500 mx-auto mt-20 rounded-full rounded-t-r-none  ">
          {reply}
        </div>
        <div className="relative flex justify-center items-center my-auto">
          <div className="hidden md:block absolute bottom-0 w-[800px] h-[120px] bg-orange-300 opacity-40 blur-2xl rounded-full "></div>

          <form
            onSubmit={onSubmitHandler}
            className="relative z-10 bg-white mx-auto my-auto w-[90%] lg:w-4xl shadow-md h-[80px] rounded-lg border border-black/10 flex items-center px-4"
          >
            <input
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 h-full px-3 py-2 focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="ml-2 bg-orange-500/80 rounded-full p-2"
            >
              <img src={assets.send} className="w-7 h-7" alt="Send" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
