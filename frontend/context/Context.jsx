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
  const [reply, setReply] = useState([]);

  const [currentState, setCurrentState] = useState("");
  const value = {
    navigate,
    backendUrl,
  };

  //send message and recive a reply from gemini api
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      backendUrl + "/api/chat",
      { message }
      //  { headers: { Authorization: `Bearer: ${token}` } }
    );
    if (!response) {
      toast.error("failled to send message");
    } else {
      setReply((prev) => [...prev, response.data.reply]);
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
        reply,
        setReply,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
