import React, { useState, useContext } from "react";
import axios from "axios";

import { assets } from "../assets/assets";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
import { toast } from "react-toastify";

const Login = () => {
  const { currentState, setCurrentState, backendUrl } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "login") {
        const response = await axios.post(backendUrl + "/api/login", {
          email,
          password,
        });
        if (response.data.success) {
          //setToken(response.data.token);
          //localStorage.setItem("");
        }
      } else {
        const response = await axios.post(backendUrl + "/api/register", {
          name,
          email,
          password,
          password_confirmation,
        });
        if (response.data.success) {
          if (currentState === "login") {
            navigate("/dashboard");
          } else {
            toast.success("account created");
            setCurrentState("login");
          }
        }
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Check console for details.");
    }
  };

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
              onSubmit={onSubmitHandler}
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

              {currentState === "login" ? (
                <button className="w-2/3 sm:w-2/5  cursor-pointer py-1 bg-[#ff7300] text-white mt-5 px-10 rounded">
                  Login
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-2/3 sm:w-2/5  cursor-pointer py-1 bg-[#ff7300] text-white mt-5 px-10 rounded"
                >
                  Sign Up
                </button>
              )}
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
