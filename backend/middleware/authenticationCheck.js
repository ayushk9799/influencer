import cookie from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const authenticationCheck = async (req, res, next) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const cookies = cookie.parse(req.headers.cookie);
    const access_token = cookies?.jwtaccesstoken;

    if (access_token) {
      const d = await jwt.verify(access_token, "influencerChataccess");

      req.user = await User.findOne({ _id: d._id });
      if (req.user) {
        next();
      } else {
        next(new Error("user not found"));
      }
    } else {
      res.clearCookie("jwtaccesstoken");
      return res.status(401).json({ message: "please login" });
    }
  } catch (error) {
    res.clearCookie("jwtaccesstoken");

    return res.status(401).json({ message: "please login" });
  }
};
