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

router.get("/google/callback", async (req, res,next) => {
  try {
    
    const code = req.query.code;

    const { tokens } = await oAuth2Client.getToken(code);

    const { id_token } = tokens;
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
     let jwtaccesstoken;
    const checkUSer = await User.findOne({ email: payload.email });
  let redirectRoute;
    let newUser;
    if (checkUSer) {
      jwtaccesstoken = await jwt.sign(
        { _id: checkUSer._id },
        "influencerChataccess"
      );
      redirectRoute=process.env.FRONTEND_URL
    } else {
     
        console.log("new")
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

      redirectRoute=`${process.env.FRONTEND_URL}/complete-profile/1`
    }
    res.cookie("jwtaccesstoken", jwtaccesstoken, {
      maxAge: 6 * 30 * 24 * 60 * 60 * 1000,
     
    });
    res.redirect(redirectRoute);
  } catch (error) {
    // res.json({ error: error.message });
    next(error)
  }
});


router.get('/logout',async(req,res,next)=>
{
      try{
        console.log("logout")
        res.clearCookie('jwtaccesstoken');
        // res.redirect('http://localhost:3001');

        res.status(200).json({done:"done"})
      }
      catch(error)
      {
        next(error)
      }
})
export default router;
