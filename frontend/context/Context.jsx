import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

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
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("login");

  //get Conversation pour sidebar
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
  //get chat history

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
      backendUrl + `/api/conversation/0`,
      {
        message:
          "give the text inside <<>> a summery title just answer directly and short <<" +
          inputValue +
          ">>",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.success) {
      return response.data.reply;
    } else {
      return "new chat";
    }
  };
  //send message and recive a reply from gemini api
  const onSubmitHandler = async (e, inputValue, id) => {
    e.preventDefault();
    try {
      if (!id) {
        id = startNewConversation(inputValue);
      }
      if (inputValue !== "") {
        setIsEmpty(false);
        setChat((prev) => [...prev, { sender: "user", text: inputValue }]);
        const response = await axios.post(
          backendUrl + `/api/conversation/${id}`,
          { message: inputValue },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response) {
          toast.error("failled to send message");
        } else {
          setChat((prev) => [
            ...prev,
            { sender: "ai", text: response.data.reply },
          ]);
          getChat(id);
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

  const getChat = async (id) => {
    const response = await axios.get(
      backendUrl + `/api/conversation/${id}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.data.success) {
      setChat(response.data.chat);
      console.log(response.data);
    }
  };

  const isLoadingHandler = () => {
    let senderCount = chat.filter((msg) => msg.sender === "user").length;
    let aiCount = chat.filter((msg) => msg.sender === "ai").length;
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
    setChat([]);
    setIsEmpty(true);
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    isLoadingHandler();
  }, [chat]);

  useEffect(() => {
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    if (token) {
      getUser();
      getConv();
    }
  }, [token]);

  //useParamas enabled only if url has id

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
        getConv,
        conversation,
        setConversation,
        delConv,
        resetForNewConversation,
        chat,
        setChat,
        getChat,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
