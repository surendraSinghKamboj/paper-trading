import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDatabase } from "@/database/db";

export async function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);

    await connectToDatabase();
    const user = await User.findById(decoded._id);

    if (!user) {
      console.log("!user");
      return {
        valid: false,
        error: err.message,
      };
    }

    return {
      valid: true,
      decoded,
    };
  } catch (err) {
    console.log("Catch");
    return {
      valid: false,
      error: err.message,
    };
  }
}
