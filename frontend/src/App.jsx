import React, { useContext, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import ReportBug from "./pages/ReportBug";
import { ToastContainer, toast } from "react-toastify";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Context } from "../context/Context";
import IsLoggedIn from "./utils/IsLoggedIn";

const App = () => {
  const { token } = useContext(Context);
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<IsLoggedIn />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
