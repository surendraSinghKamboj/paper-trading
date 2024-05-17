import mongoose from "mongoose";

const FundSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    investedFund: {
      type: Number,
    },
    currentFund: {
      type: Number,
      default: 50000,
    },
  },
  { timestamps: true }
);

mongoose.models = {};

const Fund = mongoose.model("Fund", FundSchema);

export default Fund;
