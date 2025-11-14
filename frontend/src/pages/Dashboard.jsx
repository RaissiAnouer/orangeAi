import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";
import { Context } from "../../context/Context";
import TextareaAutosize from "react-textarea-autosize";

const Dashboard = () => {
  const {
    onSubmitHandler,
    setInput,
    input,
    startNewConversation,
    resetForNewConversation,
  } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    resetForNewConversation();
  }, []);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col w-full h-full ">
        <div className="flex  flex-1 flex-col items-center justify-center ">
          <h1 className="text-2xl text-center font-medium mb-10">
            How should we get started?
          </h1>
          <form
            onSubmit={(e) => {
              onSubmitHandler(e);
            }}
            className="flex flex-col "
          >
            <div className="flex items-center w-[90%] lg:w-4xl shadow-md py-3 rounded-lg border border-black/10  px-4 ">
              <TextareaAutosize
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                className="flex flex-1  px-3 py-2 focus:outline-none resize-none rounded-md"
                placeholder="Type a message..."
                minRows={1}
                maxRows={7}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    const inputValue = input;
                    setInput("");
                    onSubmitHandler(e, inputValue);
                  }
                }}
                required
              />
              <button
                type="submit"
                className="sm:ml-2 bg-orange-500/80 rounded-full  px-5 sm:p-2"
              >
                <img src={assets.send} className="w-7 h-7 " alt="Send" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
