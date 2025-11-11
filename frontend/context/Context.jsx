import axios from "axios";
import React from "react";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const Context = createContext();

const ContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [conversation, setConversation] = useState([]);
  const [conversationId, setConversationId] = useState(0);

  const [currentState, setCurrentState] = useState("login");

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

  //create a conversation if its empty
  const startNewConversation = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/conversation",
        {
          title: input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setConversationId(response.data.conversation_id);
        return response.data.conversation_id;
      }
    } catch (error) {
      toast.error("failed to start new conversation");
      console.log(error);
      console.log("Conversation ID:", convId);
    }
  };

  //send message and recive a reply from gemini api
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let convId = conversationId;
    if (!convId) {
      convId = await startNewConversation();
    }
    try {
      if (input !== "") {
        setIsEmpty(false);
        setMessage((prev) => [...prev, { sender: "user", text: input }]);
      }
      const response = await axios.post(
        backendUrl + "/api/chat",
        { message: input, conversation_id: convId },
        { headers: { Authorization: `Bearer ${token}` } }
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
    } catch (error) {
      toast.error("failed to get ai response");
      console.log(error);
    }
  };

  const getUser = async () => {
    const response = await axios.get(backendUrl + `/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response) {
      setName(response.data.name);
      setPicture(response.data.picture);
      console.log(response.data);
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
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    isLoadingHandler();
  }, [message]);

  useEffect(() => {
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    if (token) {
      getUser();
      getConv();
    }
  }, [token]);

  return (
    <Context.Provider
      value={{
        currentState,
        setCurrentState,
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
        authChecked,
        name,
        picture,
        startNewConversation,
        conversationId,
        getConv,
        conversation,
        setConversation,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
