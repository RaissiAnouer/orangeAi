import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { assets } from "../assets/assets";
import Buttons from "./Buttons";
import SButton from "./SButton";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setCurrentState } = useContext(Context);
  return (
    <div className="flex items-center justify-between px-3  sm:px-8 py-3 ">
      <h1 className="text-black font-sm text-4xl cursor-pointer">
        orange<span className="font-bold text-[#ff7300]">Ai</span>
      </h1>
      <div className="sm:flex gap-4 hidden ">
        <Link to="/Login">
          <div onClick={() => setCurrentState("login")}>
            <SButton />
          </div>
        </Link>
        <Link to="/login">
          <div onClick={() => setCurrentState("signup")}>
            <Buttons />
          </div>
        </Link>
      </div>
      <img
        onClick={() => setVisible(true)}
        className="sm:hidden w-5 cursor-pointer"
        src={assets.menu}
        alt=""
      />
      <div
        className={`absolute top-0 bottom-0 right-0 overflow-hidden z-50 bg-white transition-all ${
          visible ? "w-full " : "w-0"
        } `}
      >
        <div className="flex flex-col gap-3 items-center text-gray-600">
          <img
            className="w-4 self-end  mt-5 mx-5 "
            onClick={() => setVisible(false)}
            src={assets.cross}
            alt=""
          />
          <div className="flex flex-col items-center pt-20 gap-3">
            <h1 className="text-black text-4xl cursor-pointer mb-5">
              orange<span className="font-bold text-[#ff7300]">Ai</span>
            </h1>
            <hr className="w-[250px] border-t-1 border-gray-300 mb-2" />
            <Link to="/login">
              <Buttons width="200px" />
            </Link>
            <Link to="/login">
              <SButton width="200px" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
