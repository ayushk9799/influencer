import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { region, fmax, fmin, platform, field } = req.query;
    
   let platforms=platform?.split(',')
   console.log(req.query)
    let query = {};
    if (region) {
      console.log("region")
      query.region = region;
    }
    if (platforms?.includes("Instagram") && platforms?.includes("YouTube")) {
      query={...query, $or:[{yaccountID:{$exists:true}},{iaccountID:{$exists:true}}]}
      if (fmax) {
        query={...query,$or:[{yfollowers:{$lte:parseInt(fmax)}},{ifollowers:{$lte:parseInt(fmax)}}]}
      }
      if (fmin) {
        query={...query,$or:[{yfollowers:{$gte:parseInt(fmin)}},{ifollowers:{$gte:parseInt(fmin)}}]}
      }
    }
    else if(platforms?.includes("YouTube")) {
      query.yaccountID = { $exists: true };
      if (fmax) {
        query.yfollowers = { $lte: parseInt(fmax) };
      }
      if (fmin) {
        query.yfollowers = { ...query.yfollowers, $gte: parseInt(fmin) };
      }
    }
    else if(platforms?.includes("Instagram")) {
      query.iaccountID = { $exists: true };
      if (fmax) {
        query.ifollowers = { $lte: parseInt(fmax) };
      }
      if (fmin) {
        query.ifollowers = { ...query.ifollowers, $gte: parseInt(fmin) };
      }
    }
    else {
      query={...query,$or:[{yaccountID:{$exists:true}},{iaccountID:{$exists:true}}]};
      if(fmax)
      {
        query={...query,$or:[{yfollowers:{$lte:parseInt(fmax)}},{ifollowers:{$lte:parseInt(fmax)}}]}
      }
      if(fmin)
      {
        query={...query,$or:[{yfollowers:{$gte:parseInt(fmin)}},{ifollowers:{$gte:parseInt(fmin)}}]}

      }
    }
    if (field) {
      query.field = { $in: field.split(',') };
    }
  console.log(query)
    const users = await User.find(query).select(
      "-email -mobileNumber -favourites -bankDetails -orders");
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get("/featured/platform/instagram", async (req, res) => {
//   const data = await InstagramAccount.find().populate({path:'user',select:'-email'})
//   res.json({ data: data });
// });

router.get("/featured/platform/instagram", async (req, res) => {
  const data = await User.find({ iaccountID: { $exists: true } }).select(
    "-email -mobileNumber -favourites -bankDetails -orders"
  );
  res.json({ data: data });
});

export default router;
