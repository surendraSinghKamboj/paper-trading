import mongoose from "mongoose";

const PnlSchema = mongoose.Schema(
  {
    pnl: {
      type: [Number],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

mongoose.models = {};

const Pnl = mongoose.model("Pnl", PnlSchema);

export default Pnl;
