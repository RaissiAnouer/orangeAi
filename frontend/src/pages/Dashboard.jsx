import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";
import axios from "axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

const Dashboard = () => {
  const {
    setMessage,
    message,
    onSubmitHandler,
    setInput,
    input,
    setIsEmpty,
    isEmpty,
  } = useContext(Context);
  useEffect(() => {
    setIsEmpty(true);
  }, []);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col w-full h-full mt-3 ml-10">
        <div className="flex justify-between w-full ">
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

        <div className="mx-auto w-4xl max-h-[600px] overflow-y-auto space-y-8">
          {message.map((msg, idx) => (
            <div
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mr-auto mt-5 gap-2`}
              key={idx}
            >
              <span
                className={`inline-block p-2 rounded-lg max-w-[70%] ${
                  msg.sender === "user" ? "bg-orange-500 text-white" : ""
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div
          className={`flex flex-1  ${
            isEmpty === true
              ? "items-center justify-center"
              : "justify-center items-end"
          } transition-all duration-300 ease-in-out `}
        >
          <form
            onSubmit={onSubmitHandler}
            className=" flex items-center w-[90%] lg:w-4xl shadow-md h-[80px] rounded-lg border border-black/10  px-4"
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="flex flex-1 h-full px-3 py-2 focus:outline-none"
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
