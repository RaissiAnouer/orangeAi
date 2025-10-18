import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { assets } from "../assets/assets";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { currentState, setCurrentState, backendUrl, token, setToken } =
    useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const navigate = useNavigate();

  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "login") {
        const response = await axios.post(backendUrl + "/api/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("orangeAiToken", response.data.token);
          toast.success("login successfull");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/register", {
          name,
          email,
          password,
          password_confirmation,
        });
        if (response.data.success) {
          toast.success("account created");
          setCurrentState("login");
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong. Check console for details.");
    }
  };

  const googleOauthLogin = async (credential) => {
    const decoded = jwtDecode(credential);
    try {
      const response = await axios.post(backendUrl + "/api/googleLogin", {
        data: decoded,
        state: currentState,
      });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("orangeAiToken", response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("orangeAiToken")) {
      setToken(localStorage.getItem("orangeAiToken"));
    }
  }, []);
  return (
    <>
      <div className="h-screen flex ">
        <img
          className="hidden sm:block w-2/5  bg-cover "
          src={assets.robot}
          alt=""
        />
        <div className="flex flex-col  w-screen ">
          <h1 className="text-black text-center pt-30 font-semibold text-5xl sm:text-7xl  pb-10">
            Hello <span className="text-[#ff7300]"> Friend !</span>
          </h1>
          <div>
            <form
              onSubmit={onLoginHandler}
              className="flex flex-col items-center pt-5 gap-5  justify-center"
            >
              {currentState === "signup" ? (
                <input
                  name="name"
                  value={name}
                  className="w-2/3 sm:w-2/5 py-1 px-3 border border-2 rounded"
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                ""
              )}
              <input
                name="email"
                className="w-2/3 sm:w-2/5 py-1 px-3 border border-2 rounded"
                value={email}
                type="email"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                name="password"
                className="w-2/3 sm:w-2/5 py-1 rounded border border-2 px-3"
                value={password}
                type="password"
                placeholder="Your Password"
                autocomplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {currentState === "signup" ? (
                <input
                  name="confirmation"
                  value={password_confirmation}
                  type="password"
                  placeholder="password confiramtion"
                  className="w-2/3 sm:w-2/5 py-1 px-3 border border-2 rounded"
                  required
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                />
              ) : (
                ""
              )}
              <div>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    googleOauthLogin(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-2/3 sm:w-2/5  cursor-pointer py-1 bg-[#ff7300] text-white mt-5 px-10 rounded"
              >
                {currentState === "login" ? <p>Login</p> : <p>Sign up</p>}
              </button>

              <div className="flex w-2/3 sm:w-2/5 justify-between gap-1 sm:gap-10 text-xs text-gray-500 pt-1 ">
                {currentState === "login" ? (
                  <p
                    onClick={() => setCurrentState("signup")}
                    className="cursor-pointer mt-[-15px]"
                  >
                    Sign Up?
                  </p>
                ) : (
                  <p
                    onClick={() => setCurrentState("login")}
                    className="cursor-pointer mt-[-15px]"
                  >
                    Login
                  </p>
                )}
                <p className="cursor-pointer mt-[-15px]">Forgot Password?</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
