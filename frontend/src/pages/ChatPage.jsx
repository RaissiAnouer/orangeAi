import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";
import axios from "axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { ThreeDot } from "react-loading-indicators";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";

const ChatPage = () => {
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
    backendUrl,
    startNewConversation,
    chat,
  } = useContext(Context);
  const targetRef = useRef();
  useEffect(() => {
    if (isLoading) {
      targetRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col w-full h-full ">
        <div className="mx-auto w-4xl h-full  overflow-y-auto space-y-2">
          {chat.map((cht, idx) => (
            <div key={idx}>
              <div className="flex  justify-end mr-auto mt-5 gap-2">
                <div ref={targetRef} />
                <div className="block p-2  rounded-lg max-w-[70%] break-words whitespace-pre-wrap bg-orange-500 text-white text-gray-700 text-[16px] leading-relaxed ">
                  {cht.userMessage}
                </div>
              </div>
              <div>
                <div className="flex  justify-start mr-auto mt-5 gap-2">
                  <div className="block p-2  rounded-lg max-w-[70%] break-words whitespace-pre-wrap text-white text-gray-700 text-[16px] leading-relaxed ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {cht.aiMessage}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
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
        <div className="flex  flex-1 justify-center items-end transition-all duration-300 ease-in-out ">
          <form
            onSubmit={(e) => {
              onSubmitHandler(e);
              setInput("");
            }}
            className="flex flex-col "
          >
            <div className="flex items-center w-[90%] lg:w-4xl shadow-md py-3 rounded-lg border border-black/10  px-4 ">
              <TextareaAutosize
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                minRows={1}
                maxRows={7}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                    const inputValue = input;
                    setInput("");
                    onSubmitHandler(e, inputValue);
                  }
                }}
                className="flex flex-1 h-full px-3 py-2 focus:outline-none resize-none rounded-md"
                placeholder="Type a message..."
                required
              />
              <button
                type="submit"
                className="sm:ml-2 bg-orange-500/80 rounded-full  px-5 sm:p-2"
                disabled={isLoading}
              >
                <img src={assets.send} className="w-7 h-7 " alt="Send" />
              </button>
            </div>
            <p className="  text-center text-sm font-light mb-5">
              orangeAi can make mistakes. Check important info.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
