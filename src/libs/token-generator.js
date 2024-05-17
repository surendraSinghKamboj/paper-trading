import jwt from "jsonwebtoken";

export function generateToken(data) {
  if (typeof data === "object") {
    // Generate JWT token
    const token = jwt.sign(data, process.env.JWT_SECRET); // Change 'secret_key' to your own secret

    // Send the token as a response
    return token;
  } else {
    return false;
  }
}