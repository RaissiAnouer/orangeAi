import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { assets } from "../assets/assets";

import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

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
    if (currentState === "login") {
      try {
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
      } catch (error) {}
    } else {
      try {
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
        } else {
          toast(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast("Something went wrong. Check console for details.");
      }
    }
  };

  const googleOauthLogin = async (credential) => {
    const decoded = jwtDecode(credential);
    try {
      const response = await axios.post(
        backendUrl +
          (currentState === "login"
            ? "/api/googleLogin"
            : "/api/googleRegister"),
        {
          UserData: decoded,
        }
      );
      if (response.data.success) {
        setToken(response.data.token);
        setCurrentState("login");
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast(error);
    }
  };
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
      <div className="h-screen flex-col  bg-[#FAFBFC]/70">
        <div className="flex items-center justify-center gap-1 pt-[5vh]">
          <img src={assets.orange} className="w-10 h-10" alt="" />

          <h1 className="text-4xl text-center">
            orange<span className="text-orange-600/70">Ai</span>
          </h1>
        </div>
        <div className="flex flex-col w-screen items-center mt-[5vh] ">
          <form
            onSubmit={onLoginHandler}
            className="flex flex-col items-center gap-5 py-10 border max-w-sm sm:max-w-md  border-gray-700/10 shadow-lg rounded-2xl bg-white "
          >
            <p className="w-5/6 text-sm text-gray-700/60">
              Only login via email or Google
            </p>
            {currentState === "signup" ? (
              <div className="flex items-center  border border-1 border-gray-500/40 rounded-xl w-5/6">
                <img src={assets.name} className="w-5 h-5 m-2" alt="" />
                <input
                  name="name"
                  value={name}
                  className="flex-1 py-3 pl-1 outline-none rounded-r-xl "
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
            <div className="flex items-center  border border-1 border-gray-500/40 rounded-xl w-5/6">
              <img src={assets.email} className="w-5 h-5 m-2" alt="" />
              <input
                name="email"
                className="flex-1 py-3 pl-1 outline-none rounded-r-xl"
                value={email}
                type="email"
                placeholder="email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center  border border-1 border-gray-500/40 rounded-xl  w-5/6">
              <img src={assets.password} className="w-5 h-5 m-2" alt="" />
              <input
                name="password"
                className=" flex-1 py-3 pl-1 outline-none rounded-r-xl"
                value={password}
                type="password"
                placeholder="Your Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {currentState === "signup" ? (
              <div className="flex items-center  border border-1 border-gray-500/40 rounded-xl  w-5/6">
                <img src={assets.password} className="w-5 h-5 m-2" alt="" />
                <input
                  name="confirmation"
                  value={password_confirmation}
                  type="password"
                  placeholder="password confiramtion"
                  className="flex-1 py-3 pl-1 outline-none rounded-r-xl"
                  required
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
            <p className="w-5/6 text-sm text-gray-700/60">
              By signing up or logging in, you consent to orangeAi's {""}
              <span className="border-b-1 text-black cursor-pointer">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className="border-b-1 text-black cursor-pointer">
                Privacy Policy.
              </span>
            </p>
            <button
              type="submit"
              className="w-5/6  cursor-pointer py-3 bg-[#ff7300] text-white  px-10 rounded-xl"
            >
              {currentState === "login" ? <p>Login</p> : <p>Sign up</p>}
            </button>
            <div className="flex w-5/6 justify-between items-center text-sm font-medium text-[#ff7300] pt-1 ">
              <p className="cursor-pointer mt-[-15px]">Forgot Password?</p>

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
            </div>
            <div className="flex w-5/6 items-center">
              <p className="bg-gray-500/10 h-[1px] w-[49%]"></p>
              <p className="text-gray-700/30 text-sm">OR</p>
              <p className="bg-gray-500/10 h-[1px] w-[49%]"></p>
            </div>

            <div>
              <GoogleLogin
                width="376px"
                size="large"
                theme="filled_blue"
                onSuccess={(credentialResponse) => {
                  googleOauthLogin(credentialResponse.credential);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
