import axios from "axios";
import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Context = createContext();

const ContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  const [currentState, setCurrentState] = useState("login");
  //send message and recive a reply from gemini api
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (input !== "") {
      setIsEmpty(false);
      setMessage((prev) => [...prev, { sender: "user", text: input }]);
    }
    const response = await axios.post(
      backendUrl + "/api/chat",
      { message: input }
      //  { headers: { Authorization: `Bearer: ${token}` } }
    );
    if (!response) {
      toast.error("failled to send message");
    } else {
      setInput("");
      setMessage((prev) => [
        ...prev,
        { sender: "ai", text: response.data.reply },
      ]);
    }
  };

  const isLoadingHandler = () => {
    let senderCount = message.filter((msg) => msg.sender === "user").length;
    let aiCount = message.filter((msg) => msg.sender === "ai").length;
    if (senderCount > aiCount) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    isLoadingHandler();
  }, [message]);

  return (
    <Context.Provider
      value={{
        currentState,
        setCurrentState,
        navigate,
        backendUrl,
        message,
        setMessage,
        onSubmitHandler,
        input,
        setInput,
        setIsEmpty,
        isEmpty,
        isLoading,
        setIsLoading,
        token,
        setToken,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
