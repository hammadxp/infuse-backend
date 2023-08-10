import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export function generateRandomString() {
  return crypto.randomBytes(128).toString("base64");
}

export function encryptString(password: string, salt: string) {
  return crypto.createHmac("sha256", [password, salt].join("/")).update(process.env.SECRET).digest("hex");
}
