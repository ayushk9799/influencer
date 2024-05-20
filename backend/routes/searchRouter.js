import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { region, fmax, fmin, platforms, field } = req.query;
    
   let platform=platforms?.split(',')
   console.log(req.query)
    let query = {};
    if (region) {
      console.log("region")
      query.region = region;
    }
    if (platform?.includes("Instagram") && platform?.includes("YouTube")) {
      query={...query, $or:[{uaccountID:{$exists:true}},{iaccountID:{$exists:true}}]}
      if (fmax) {
        query={...query,$or:[{ufollowers:{$lte:parseInt(fmax)}},{ifollowers:{$lte:parseInt(fmax)}}]}
      }
      if (fmin) {
        query={...query,$or:[{ufollowers:{$gte:parseInt(fmin)}},{ifollowers:{$gte:parseInt(fmin)}}]}
      }
    }
    else if(platform?.includes("YouTube")) {
      query.uaccountID = { $exists: true };
      if (fmax) {
        query.ufollowers = { $lte: parseInt(fmax) };
      }
      if (fmin) {
        query.ufollowers = { ...query.ufollowers, $gte: parseInt(fmin) };
      }
    }
    else if(platform?.includes("Instagram")) {
      query.iaccountID = { $exists: true };
      if (fmax) {
        query.ifollowers = { $lte: parseInt(fmax) };
      }
      if (fmin) {
        query.ifollowers = { ...query.ifollowers, $gte: parseInt(fmin) };
      }
    }
    else {
      query={...query,$or:[{uaccountID:{$exists:true}},{iaccountID:{$exists:true}}]};
      if(fmax)
      {
        query={...query,$or:[{ufollowers:{$lte:parseInt(fmax)}},{ifollowers:{$lte:parseInt(fmax)}}]}
      }
      if(fmin)
      {
        query={...query,$or:[{ufollowers:{$gte:parseInt(fmin)}},{ifollowers:{$gte:parseInt(fmin)}}]}

      }
    }
    if (field) {
      query.field = { $in: field.split(',') };
    }
  console.log(query)
    const users = await User.find(query);
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
    "-email"
  );
  res.json({ data: data });
});

export default router;
