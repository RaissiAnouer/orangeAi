import { useEffect, useState, useRef } from "react";
import models from "../models.json";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiReady, setAiReady] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkReady = setInterval(() => {
      if (window.puter?.ai?.chat) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 3000);
    return () => clearInterval(checkReady);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (content, isUser, id = null) => {
    setMessages((prev) => [...prev, { content, isUser, id: id || Date.now() }]);
  };

  const updateLastMessage = (content) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      if (
        newMessages.length > 0 &&
        !newMessages[newMessages.length - 1].isUser
      ) {
        newMessages[newMessages.length - 1].content = content;
      }
      return newMessages;
    });
  };

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message || !aiReady) return;

    addMessage(message, true);
    setInputValue("");
    setIsLoading(true);
    setError("");

    try {
      const conversation = [
        {
          role: "system",
          content: "you are helpful assistant.",
        },
        ...messages.map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.content,
        })),
        { role: "user", content: message },
      ];

      console.log("=== CALLING PUTER AI ===");
      console.log("Conversation:", conversation);
      console.log("Model:", selectedModel);

      const response = await window.puter.ai.chat(conversation, {
        model: selectedModel,
        stream: true,
      });

      console.log("=== RESPONSE RECEIVED ===");
      console.log("Response:", response);
      console.log("Type:", typeof response);
      console.log("Constructor:", response?.constructor?.name);
      console.log("Keys:", Object.keys(response || {}));
      console.log(
        "Has [Symbol.asyncIterator]:",
        response && typeof response[Symbol.asyncIterator] === "function"
      );
      console.log(
        "Is iterable:",
        response && typeof response[Symbol.iterator] === "function"
      );

      // Try first without stream to see what normal response looks like
      if (false) {
        const normalResponse = await window.puter.ai.chat(conversation, {
          model: selectedModel,
          stream: false,
        });
        console.log("=== NORMAL RESPONSE FOR COMPARISON ===");
        console.log(normalResponse);
      }

      let success = false;

      if (!success) {
        console.log("=== FALLBACK TO REGULAR RESPONSE ===");
        const reply =
          typeof response === "string"
            ? response
            : response?.message?.content ||
              response?.content ||
              response?.choices?.[0]?.message?.content ||
              JSON.stringify(response);

        updateLastMessage(reply || "No response received");
      }
    } catch (error) {
      console.error("=== ERROR ===", error);
      setError("Error: " + error.message);
      addMessage("Error occurred: " + error.message, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    const model = models.find((m) => m.id === newModel);
    addMessage(`Switched to ${model.name} (${model.provider})`, false);
  };

  const currentModel = models.find((m) => m.id === selectedModel) || models[0];

  return (
    <div className="min-w-screen flex flex-1">
      <Sidebar />
      <div className="min-h-screen w-full  flex flex-col items-center gap-2">
        <div className="flex w-full justify-between border-b border-gray-200  ">
          <select
            value={selectedModel}
            onChange={handleModelChange}
            disabled={!aiReady}
            className=" m-2 bg-orange-200 rounded-xl p-1 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id} className="open:border-0">
                {model.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" w-full ">
          <div className="h-130 mx-60 overflow-y-auto display:scroll-none">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                Start the conversation by typing message below
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 m-2 rounded-2xl w-fit max-w-[80%] text-wrap ${
                  msg.isUser
                    ? "bg-[#ff7300] text-white ml-auto text-right"
                    : "bg-gray-50 text-black"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className="p-3 m-2 rounded-2xl max-w-xs">
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full"></div>
                  <span>{currentModel.name} is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                !aiReady
                  ? "Waiting for AI to be ready..."
                  : "Type your message here..."
              }
              disabled={!aiReady || isLoading}
              className="flex-1 mx-60 px-4 py-3 border  rounded-4xl focus:outline-none 
            focus:shadow-xs transition duration-400 disabled:opacity-50 
            disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
