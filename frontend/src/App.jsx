import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { Routes, Route } from "react-router-dom";
import ReportBug from "./pages/ReportBug";
import { ToastContainer, toast } from "react-toastify";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/report" element={<ReportBug />} />
      </Routes>
    </>
  );
};

export default App;
