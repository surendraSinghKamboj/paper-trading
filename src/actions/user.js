"use server";
import generateSHA512 from "@/libs/sha";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { generateToken } from "@/libs/token-generator";
import { connectToDatabase } from "@/database/db";
import Fund from "@/models/Fund";
import User from "@/models/User";

export const register = async (data) => {
  let token;
  let state;
  // console.log(data);
  try {
    await connectToDatabase();
    const { fullName, email, password } = data.formData;
    const check = await User.findOne({ email });
    // console.log("User info : ", check);
    // console.log(check);
    if (check) {
      state = { status: false, message: "Already Register" };
    } else {
      const hashedPassword = generateSHA512(password);
      const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
      });
      if (!user) {
        state = { status: false, message: "User couldn't Created." };
      } else {
        const fund = await Fund.create({ userId: user._id });
        await User.findByIdAndUpdate(user._id, { fundId: fund._id });
        token = generateToken({ _id: user._id });
        state = { status: true, message: "User Created Successfully." };
      }
    }
  } catch (error) {
    console.log(error);
    state = { status: false, message: "Internal Server Error." };
  }
  if (state.status) {
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
    });
    redirect("/dashboard");
    // return JSON.stringify(state);
  } else {
    return JSON.stringify(state);
  }
};

export const loginAction = async (data) => {
  let token;
  let state;
  // console.log(data);
  const { email, password } = data;
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    // console.log("User info : ", user);
    if (!user) {
      state = { status: false, message: "Username or Password Incorrect." };
    } else {
      if (user.password !== generateSHA512(password)) {
        state = { status: false, message: "Username or Password Incorrect." };
      } else {
        token = generateToken({ _id: user._id });
        state = { status: true, message: "User Created Successfully." };
      }
    }
  } catch (error) {
    console.log(error);
    state = { status: false, message: "Internal Server Error." };
  }
  if (state.status) {
    console.log("first");
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
    });
    redirect("/dashboard");
    // return JSON.stringify(state);
  } else {
    console.log("Second");
    return JSON.stringify(state);
  }
};
