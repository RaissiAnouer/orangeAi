import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { Navigate, Outlet } from "react-router-dom";

const IsLoggedIn = () => {
  const { token, authChecked } = useContext(Context);
  if (!authChecked) {
    return null;
  }
  return token ? <Navigate to={"/dashboard"} /> : <Outlet />;
};
export default IsLoggedIn;
