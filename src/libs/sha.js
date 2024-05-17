import crypto from "crypto";

function generateSHA512(password) {
  // Generate the SHA-512 hash
  const hash = crypto.createHash("sha512");
  hash.update(password);
  return hash.digest("hex");
}

export default generateSHA512;