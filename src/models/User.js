// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fund",
    },
    pnlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pnl",
    },
  },
  { timestamps: true }
);

mongoose.models = {};

const User = mongoose.model("User", UserSchema);

export default User;
