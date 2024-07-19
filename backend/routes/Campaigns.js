import express from "express";
import { Campaign } from "../models/campaigns.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Campaign.find({}).populate({
      path: "postedBy",
      select: "name profilePic",
    });

    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      title,
      gender,
      minFollowers,
      maxFollowers,
      amount,
      platform,
      images,
      fields,
      description,
    } = req.body.data;

    // Create a new campaign document
    const newCampaign = new Campaign({
      postedBy: req.user._id,
      amount: amount,

      criteria: {
        followerCount: {
          min: minFollowers,
          max: maxFollowers,
        },
        gender: gender || "Any",
        platform: platform,
        fields,
      },
      title,
      description,
      images,
    });

    await newCampaign.save();

    res
      .status(201)
      .json({
        message: "Campaign created successfully",
        campaign: newCampaign,
      });
  } catch (error) {
    next(error);
  }
});

export default router;
