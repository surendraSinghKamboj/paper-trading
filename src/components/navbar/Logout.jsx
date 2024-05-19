"use client";
import { logout, upstoxLogin } from "@/actions/user";
import React from "react";
import { IoMdLogOut } from "react-icons/io";

const Logout = () => {
  const handleClick = async () => {
    const res = await logout({ log: false });
  };

  return (
    <div className="flex gap-4">
      <IoMdLogOut onClick={handleClick} className="text-2xl cursor-pointer" />
      <div
        className="w-6 h-6 rounded-full bg-green-600"
        onClick={async () => {
          await upstoxLogin();
        }}
      ></div>
    </div>
  );
};

export default Logout;
