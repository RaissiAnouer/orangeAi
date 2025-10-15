import React, { useContext } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { Context } from "../../context/Context";

const ProtectedRoutes = () => {
  const { token } = useContext(Context);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
