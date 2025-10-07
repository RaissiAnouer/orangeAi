import React from "react";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";

const Dashboard = () => {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <form className="relative mx-auto my-auto w-[90%]  lg:w-2xl shadow-md h-[80px] rounded-lg border-1 border-black/10   ">
        <input className="absolute top-0  left-0 right-0  px-5 pb-6 pt-3 focus:outline-none" />
        <button className="absolute bottom-0 right-0 m-2 bg-orange-500/40 rounded-full p-1">
          <img src={assets.send} className="w-7 h-7" alt="" />
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
