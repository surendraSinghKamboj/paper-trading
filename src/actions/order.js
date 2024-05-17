"use server";

import { verifyToken } from "@/libs/verify-token";
import Fund from "@/models/Fund";
import Order from "@/models/Order";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createOrder = async (data) => {
  const auth = cookies().get("token")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }
  let fund;
  let status;
  try {
    if (data.orderType === "BUY") {
      fund = data.buy * data.lotSize * data.quantity;
    }
    // console.log(fund);
    const availableFund = await Fund.findOne({ userId: verify.decoded._id });
    // console.log(availableFund);
    if (!availableFund) {
      return JSON.stringify({
        status: false,
        message: "Your Fund A/C not Found.",
      });
    }
    // console.log("third");
    console.log(availableFund.currentFund >= fund);
    if (availableFund.currentFund <= fund) {
      return JSON.stringify({ status: false, message: "Your Fund is Low." });
    }

    const res = await Order.create({ ...data, userId: verify.decoded._id });
    // console.log("4 th step");
    if (!res) {
      status = { status: false, message: "Order couldn't Placed." };
    } else {
      // console.log("fifth step");
      // console.log(availableFund.currentFund);
      await Fund.findOneAndUpdate(
        { userId: verify.decoded._id },
        {
          $set: { currentFund: availableFund.currentFund - fund },
          $inc: { investedFund: fund },
        }
      );

      // console.log("sixth step");
      status = { status: true, message: "Order Placed Successfully." };
    }
  } catch (error) {
    console.log(error);
    status = { status: false, message: "Internal Server Error." };
  }
  return JSON.stringify(status);
};

// export const updateOrder = async (data) => {
//   const auth = cookies().get("token")?.value;
//   if (!auth) {
//     redirect("/");
//   }
//   const verify = await verifyToken(auth);
//   if (!verify.valid) {
//     redirect("/");
//   }
// };

export const getAllOrders_withOtherData = async () => {
  const auth = cookies().get("token")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }
  let user;
  let fund;
  let todayOpenOrders;
  let todayClosedOrders;
  let previousOpenOrders;
  try {
    user = await User.findById(verify.decoded._id);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the beginning of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Get tomorrow's date

    // Fetching today's OPEN orders

    todayOpenOrders = await Order.find({
      userId: verify.decoded._id,
      updatedAt: {
        $gte: today,
        $lt: tomorrow,
      },
      orderStatus: "OPEN",
    });

    // Fetching today's CLOSED

    todayClosedOrders = await Order.find({
      userId: verify.decoded._id,
      updatedAt: {
        $gte: today,
        $lt: tomorrow,
      },
      orderStatus: "CLOSED",
    });

    // Fetching all previous OPEN

    previousOpenOrders = await Order.find({
      userId: verify.decoded._id,
      updatedAt: {
        $lt: today,
      },
      orderStatus: "OPEN",
    });

    fund = await Fund.findOne({ userId: verify.decoded._id });
  } catch (error) {
    console.log(error);
  }
  return JSON.stringify({
    user,
    fund,
    todayOpenOrders,
    todayClosedOrders,
    previousOpenOrders,
  });
};

export const exitOrder = async (data) => {
  const { orderId, orderType, exitPrice } = data;
  const auth = cookies().get("token")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }
  try {
    const order = await Order.findByIdAndUpdate(orderId, {
      sell: exitPrice,
      orderStatus: "CLOSE",
    });
    const fund = await Fund.findOne({ userId: verify.decoded._id });
    const fundUpdate = await Fund.findByIdAndUpdate(fund._id, {
      currentFund:
        fund.currentFund + exitPrice * order.lotSize * order.quantity - 50,
      investedFund:
        fund.investedFund - order.buy * order.lotSize * order.quantity,
    });
    if (!order) {
      return JSON.stringify({
        status: false,
        message: "Exited your Position failed.",
      });
    }
    return JSON.stringify({
      status: true,
      message: "Exited your Position.",
      fundUpdate,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      status: false,
      message: "Exited your Position failed.",
    });
  }
};

export const getAllClosedOrders = async () => {
  const auth = cookies().get("token")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }
  try {
    const orders = await Order.find({
      userId: verify.decoded._id,
    }).sort({ createdAt: -1 });

    if (!orders) {
      return JSON.stringify({ status: false, message: "Orders Not Found" });
    }
    return JSON.stringify({ status: true, orders });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ status: false, message: "Internal Server error." });
  }
};
