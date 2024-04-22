import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.get("/search", (req, res) => {
  const { platform, field, fmin, fmax, country, language, gender } = req.query;

  res.json({ message: "hello" });
});

const featuredList = (platform) => {};
router.get("/featured/platform/instagram", async (req, res) => {
  const data = await User.find({});

  res.json({ data: data });
});

router.get("/featured/platform/youtube", (req, res) => {});

export default router;
