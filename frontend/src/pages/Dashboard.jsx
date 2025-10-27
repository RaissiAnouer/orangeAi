import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";
import axios from "axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { ThreeDot } from "react-loading-indicators";

const Dashboard = () => {
  const {
    setMessage,
    message,
    onSubmitHandler,
    setInput,
    input,
    setIsEmpty,
    isEmpty,
    isLoading,
    isLoadingHandler,
    name,
  } = useContext(Context);
  const targetRef = React.createRef();
  useEffect(() => {
    if (isLoading) {
      targetRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col w-full h-full ">
        <div className="mx-auto w-4xl  overflow-y-auto space-y-8">
          {message.map((msg, idx) => (
            <div
              className={`flex ${
                msg.sender === "user" ? "justify-end" : `justify-start`
              } mr-auto mt-5 gap-2`}
              key={idx}
            >
              {msg.sender === "user" && <div ref={targetRef} />}

              <span
                className={`inline-block p-2 rounded-lg max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-orange-500 text-white"
                    : " text-[17px] font-[300] leading-[1.8]"
                }`}
              >
                {Array.isArray(msg.text)
                  ? msg.text.map((part, i) =>
                      i % 2 === 1 ? (
                        <strong className="text-xl" key={i}>
                          <br />
                          {part} <br />
                        </strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )
                  : msg.text}
              </span>
            </div>
          ))}
          {isLoading && (
            <ThreeDot
              variant="pulsate"
              color="#FF9800"
              size="small"
              text=""
              textColor=""
            />
          )}
        </div>
        <div
          className={`flex  flex-1 ${
            isEmpty === true
              ? "flex-col items-center justify-center "
              : "justify-center items-end"
          } transition-all duration-300 ease-in-out `}
        >
          <h1
            className={`text-2xl text-center font-medium    ${
              isEmpty === true ? "mb-10" : "hidden"
            }`}
          >
            How should we get started?
          </h1>
          <form
            onSubmit={(e) => {
              onSubmitHandler(e);
            }}
            className="flex flex-col "
          >
            <div className="flex items-center w-[90%] lg:w-4xl shadow-md py-3 rounded-lg border border-black/10  px-4 ">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="flex flex-1 h-full px-3 py-2 focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="sm:ml-2 bg-orange-500/80 rounded-full  px-5 sm:p-2"
              >
                <img src={assets.send} className="w-7 h-7 " alt="Send" />
              </button>
            </div>
            <p
              className={` ${
                isEmpty === true ? "hidden" : " "
              } text-center text-sm font-light mb-5`}
            >
              orangeAi can make mistakes. Check important info.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
