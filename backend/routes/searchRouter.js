import express from "express";
import { User } from "../models/user.js";
import { InstagramAccount } from "../models/InstagramAccount.js";
const router = express.Router();

router.get("/search", (req, res) => {
  const { platform, field, fmin, fmax, country, gender } = req.query;

  if(platform="instgaram")
  {
    const data= await InstagramAccount.find({})
  }

  res.json({ message: "hello" });
});

router.get("/featured/platform/instagram", async (req, res) => {
  const data = await InstagramAccount.find().populate({path:'user',select:'-email'})
  res.json({ data: data });
});

router.get("/featured/platform/youtube", (req, res) => {});

export default router;
