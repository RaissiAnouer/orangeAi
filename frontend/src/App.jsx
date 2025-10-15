import React, { useContext, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import ReportBug from "./pages/ReportBug";
import { ToastContainer, toast } from "react-toastify";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Context } from "../context/Context";

const App = () => {
  const { token } = useContext(Context);
  return (
    <>
      <ToastContainer />
      <Routes>
        {token === "" && <Route path="/login" element={<Login />} />}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
