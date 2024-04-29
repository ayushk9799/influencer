import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
const router = express.Router();
import { OAuth2Client } from "google-auth-library";
const CLIENT_ID =
  "708505773923-9fuh2eqg0lr8sgl86p7dsuh2v0pjuslt.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

router.get("/google", (req, res) => {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile"],
    prompt: "consent",
  });

  res.redirect(302, authorizeUrl);
});

router.get("/google/callback", async (req, res) => {
try{
  console.log("callback")
  const code = req.query.code;
console.log(code)
  const { tokens } = await oAuth2Client.getToken(code);
console.log(tokens)
  const {  id_token } = tokens;
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: id_token,
    audience: CLIENT_ID,
  });
console.log("tivcket")
  const payload = ticket.getPayload();
console.log(payload)
  let jwtaccesstoken;
  const checkUSer = await User.findOne({ email: payload.email });
  let newUser;
  if (checkUSer) {
    jwtaccesstoken = await jwt.sign(
      { _id: checkUSer._id },
      "influencerChataccess"
    );
  } else {
    newUser = new User({
      email: payload.email,
      name: payload.name,
      profilePic: payload.picture,
    });
    await newUser.save();

    jwtaccesstoken = await jwt.sign(
      { _id: newUser._id },
      "influencerChataccess"
    );
  }
  res.cookie("jwtaccesstoken", jwtaccesstoken, {
    maxAge: 6 * 30 * 24 * 60 * 60 * 1000,
  });
  res.redirect("http://localhost:3001/myAccount");
}
catch(error)
  {
    console.log(error);
    res.json({error:error.message})
  }
});
export default router;
