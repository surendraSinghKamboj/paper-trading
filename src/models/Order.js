import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    instrument: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderType: {
      type: String,
      required: true,
      enum: ["BUY", "SELL"],
    },
    buy: {
      type: Number,
      default: 0,
    },
    sell: {
      type: Number,
      default: 0,
    },
    sl: {
      type: Number,
    },
    tg: {
      type: Number,
    },
    lotSize: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
    },
  },
  { timestamps: true }
);

mongoose.models = {};

const Order = mongoose.model("Order", OrderSchema);

export default Order;
