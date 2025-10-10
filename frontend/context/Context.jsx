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

  const [currentState, setCurrentState] = useState("");
  const value = {
    navigate,
    backendUrl,
  };

  //send message and recive a reply from gemini api
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage((prev) => [...prev, { sender: "user", text: input }]);
    const response = await axios.post(
      backendUrl + "/api/chat",
      { message: input }
      //  { headers: { Authorization: `Bearer: ${token}` } }
    );
    if (!response) {
      toast.error("failled to send message");
    } else {
      toast.success(response.data.reply);
      setInput("");
      setMessage((prev) => [
        ...prev,
        { sender: "ai", text: response.data.reply },
      ]);
      toast.success(response.data.reply);
    }
  };

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
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
