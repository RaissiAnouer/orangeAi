import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
  const startNewConversation = async (inputValue) => {
    try {
      const title = await titleGenerator(inputValue);
      const response = await axios.post(
        backendUrl + "/api/conversation",
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setConversationId(response.data.conversation_id);
        getConv();
        return response.data.conversation_id;
      }
    } catch (error) {
      toast.error("failed to start new conversation");
      console.log(error);
    }
  };

  const titleGenerator = async (inputValue) => {
    const response = await axios.post(
      backendUrl + "/api/chat",
      {
        message:
          "Summarize this chat in ONE short, clear title (max 6 words). Only output the title, no explanations: " +
          inputValue,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.success) {
      toast.success(message);
      return response.data.reply;
    } else {
      return "new chat";
    }
  };

  //send message and recive a reply from gemini api
  const onSubmitHandler = async (e, inputValue) => {
    e.preventDefault();
    let convId = conversationId;
    if (!convId) {
      convId = await startNewConversation(inputValue);
      navigate(`/conversation/${convId}`);
    }
    try {
      if (inputValue !== "") {
        setIsEmpty(false);
        setMessage((prev) => [...prev, { sender: "user", text: inputValue }]);
        const response = await axios.post(
          backendUrl + "/api/chat",
          { message: input, conversation_id: convId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response) {
          toast.error("failled to send message");
        } else {
          setMessage((prev) => [
            ...prev,
            { sender: "ai", text: response.data.reply },
          ]);
        }
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

  const delConv = async (id) => {
    try {
      const response = await axios.delete(
        backendUrl + `/api/conversation/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setConversation((prev) => prev.filter((conv) => conv.id !== id));
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const resetForNewConversation = () => {
    setConversationId(0);
    setMessage([]);
    setIsEmpty(true);
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
        delConv,
        setConversationId,
        resetForNewConversation,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
