import cookie from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const authenticationCheckSocket = async (socket, next) => {
  try {
    //
    const cookies = cookie.parse(socket.request.headers.cookie);
    const access_token = cookies.jwtaccesstoken;
  console.log("authentication connecting")
    if (access_token) {
      try {
        const d = jwt.verify(access_token, "influencerChataccess");

        socket.user = await User.findOne({ _id: d._id });

        next();
      } catch (error) {
        next(new Error("not acceptable"));
      }
    } else {
      next(new Error("authenticate please"));
    }
  } catch (error) {
    next(new Error("authenticate please"));
  }
};
