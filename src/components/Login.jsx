"use client";
import Image from "next/image";
import React, { useState } from "react";
import icon from "@/assets/icon.png";
import Link from "next/link";
import { loginAction } from "@/actions/user";
import { ImSpinner10 } from "react-icons/im";

const Login = () => {
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
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
      const res = await loginAction(formData);
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
        <h2 className="text-2xl font-bold mb-6 text-center mt-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
            {loader ? (
              <ImSpinner10 className="mx-auto text-white animate-spin" />
            ) : (
              "Login"
            )}
          </button>

          <p className="mt-4">
            New User <Link href={"/?user=register"}>Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
