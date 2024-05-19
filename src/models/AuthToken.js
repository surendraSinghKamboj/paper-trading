import mongoose, { models } from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

mongoose.models = {};

const Token = mongoose.model("token", TokenSchema);

export default Token;
