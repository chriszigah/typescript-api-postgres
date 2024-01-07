import crypto from "crypto";
const dotenv = require("dotenv");

import * as nanoid from "nanoid";

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
  const SECRET_KEY: any = process.env.SECRET_KEY;
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET_KEY)
    .digest("hex");
};

export const getenv = () => {
  return process.env.NODE_ENV === undefined || "test"
    ? dotenv.config({ path: "src/dev.env" })
    : dotenv.config();
};

export const generateId = nanoid.customAlphabet("0123456789abcdefgh", 21);
