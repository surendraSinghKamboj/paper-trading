"use server";
import generateSHA512 from "@/libs/sha";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { generateToken } from "@/libs/token-generator";
import { connectToDatabase } from "@/database/db";
import Fund from "@/models/Fund";
import User from "@/models/User";
import Pnl from "@/models/Pnl";

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
        const pnl = await Pnl.create({ userId: user._id });
        await User.findByIdAndUpdate(user._id, {
          fundId: fund._id,
          pnlId: pnl._id,
        });
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
        if (!user.pnlId) {
          const pnl = await Pnl.create({ userId: user._id });
          await User.findByIdAndUpdate(user._id, { pnlId: pnl._id });
        }
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

export const logout = async (data) => {
  cookies().set({
    name: "token",
    value: null,
    httpOnly: true,
    path: "/",
  });

  redirect("/?user=login");
};

export const upstoxLogin = async () => {
  const redirectUri = encodeURIComponent("http://localhost:3000/login");
  const authUrl = `https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=${process.env.API_KEY}&redirect_uri=${redirectUri}`;
  return redirect(authUrl);
};

export const authToken = async (code) => {
  let data = { status: true };
  let access_token;
  try {
    const tokenData = {
      code,
      client_id: process.env.API_KEY,
      client_secret: process.env.API_SECRET,
      redirect_uri: "http://localhost:3000/login",
      grant_type: "authorization_code",
    };
    const response = await fetch(
      "https://api-v2.upstox.com/login/authorization/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Api-Version": "2.0",
        },
        body: new URLSearchParams(tokenData),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      access_token = responseData.access_token;
      data = { status: true, responseData };
    } else {
      data = { status: false };
    }
  } catch (error) {
    console.log(error);
    data = { status: false };
  }

  if (!data.status) {
    return JSON.stringify({ status: false });
  }
  process.env.ACCESS_TOKEN = access_token;
  redirect("/dashboard");
};
