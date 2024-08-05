import cookie from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const authenticationCheck = async (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie);
    const access_token = cookies?.jwtaccesstoken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdlYTRhNGQxZmNkMzYyY2FlNzIzZWUiLCJpYXQiOjE3MjI4NDI1OTd9.Btfd4UOsjVhoR0iCIglKCM-DCWsa82KmNcJuuDmT8rY'
    // const access_token = cookies?.jwtaccesstoken;
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
