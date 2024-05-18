"use server";

import Fund from "@/models/Fund";
import { verifyToken } from "@/libs/verify-token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getFunds = async () => {
  const auth = cookies().get("token")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }
  try {
    const fund = await Fund.findOne({ userId: verify.decoded._id }).populate('userId',"fullName email");
    if (!fund) {
      return JSON.stringify({
        status: false,
        message: "Your fund account not found please Contact Admin.",
      });
    }
    return JSON.stringify({ status: true, fund });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ status: false, message: "Internal Server Error" });
  }
};
