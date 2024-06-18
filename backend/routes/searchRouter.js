import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { region, fmax, fmin, platform, field } = req.query;
   console.log(req.query)
    let platforms = platform?.split(",");
    
    let query = {};
    if (region) {
      query.region = region;
    }
    if (platforms?.includes("Instagram") && platforms?.includes("YouTube")) {

      let conditions=[];
      conditions.push({$or: [
        { yaccountID: { $exists: true } },
        { iaccountID: { $exists: true } },
      ]})
      
      
      if (fmax) {
        conditions.push({
          $or: [
            { yfollowers: { $lte: parseInt(fmax) } },
            { ifollowers: { $lte: parseInt(fmax) } }
          ]
        });
      }
      if (fmin) {
        conditions.push({
          $or: [
            { yfollowers: { $gte: parseInt(fmin) } },
            { ifollowers: { $gte: parseInt(fmin) } }
          ]
        });
       
      }
      if (conditions.length > 0) {
        query = {
          ...query,
          $and: conditions
        };
      }


    } else if (platforms?.includes("YouTube")) {
      query.yaccountID = { $exists: true };
      if (fmax && fmin) {

        query.yfollowers={$gte:parseInt(fmin),$lte:parseInt(fmax)}
      }
      
    } else if (platforms?.includes("Instagram")) {
      query.iaccountID = { $exists: true };
      if (fmax && fmin) {

        query.ifollowers={$gte:parseInt(fmin),$lte:parseInt(fmax)}
      }
    } else {
      
      const conditions = [];

if (fmax && fmax<1000000) {

  conditions.push({
    $or: [
      { yfollowers: { $lte: parseInt(fmax) } },
      { ifollowers: { $lte: parseInt(fmax) } }
    ]
  });
}

if (fmin) {
  conditions.push({
    $or: [
      { yfollowers: { $gte: parseInt(fmin) } },
      { ifollowers: { $gte: parseInt(fmin) } }
    ]
  });
}

if (conditions.length > 0) {
  query = {
    ...query,
    $and: conditions
  };
}
      
    }
    if (field) {
      query.field = { $in: field.split(",") };
    }
    console.log(query)
    const users = await User.find(query).select(
      "-email -mobileNumber -favourites -bankDetails -orders"
    )
    
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
