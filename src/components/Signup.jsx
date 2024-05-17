"use client";
import Image from "next/image";
import React, { useState } from "react";
import icon from "@/assets/icon.png";
import Link from "next/link";
import { register } from "@/actions/user";

const UserRegistration = () => {
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await register({ formData });
      setLoader(false);
      const data = JSON.parse(res);
      if (data.status) {
        alert("logged in");
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Image
          src={icon}
          alt="icon"
          width={64}
          height={64}
          className="mx-auto"
        />
        <h2 className="text-2xl font-bold mb-6 text-center mt-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john_doe@gmail.com"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {" "}
            {loader ? (
              <div className="w-6 h-6 border-l-2 border-t-2 border-b-2 border-white mx-auto animate-spin rounded-full"></div>
            ) : (
              "Register"
            )}
          </button>
          <p className="mt-4">
            Already Registered <Link href={"/?user=login"}>Login now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
