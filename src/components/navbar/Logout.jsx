"use client";
import { logout } from "@/actions/user";
import React from "react";
import { IoMdLogOut } from "react-icons/io";

const Logout = () => {
  const handleClick = async () => {
    const res = await logout({ log: false });
  };
  return <IoMdLogOut onClick={handleClick} className="text-2xl cursor-pointer" />;
};

export default Logout;
