import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

const ContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("");
  const value = {
    navigate,
    backendUrl,
  };

  return (
    <Context.Provider
      value={{ currentState, setCurrentState, navigate, backendUrl }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
