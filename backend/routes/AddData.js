import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let check = await User.findById(req.user._id);

    //
    // let check=0;
    if (!check) {
      next(new Error("user not found in database or try again"));
    } else {
      const data = req.body;
     
      for (let keys in data) {
        // if (data[keys]) {
        //   if (typeof data[keys] === "object") {
        //     for (let nestedKey in data[keys]) {
        //       check[keys][nestedKey] = data[keys][nestedKey];
        //     }
        //   } else {
        //     check[keys] = data[keys];
        //   }
        // }    //array wont get updated

        check[keys]=data[keys]
      }

      // if(req.body?.bio)
      // {
      //   check.bio=req.body?.bio
      // }
      // if (req.body?.gender) {
      //     check.gender = req.body?.gender;
      //   }
      //   if (req.body?.region) {
      //     check.region = req.body?.region;
      //   }

      //   if(req.body?.field)
      //   {
      //     check.field=req.body?.field
      //   }
      //   if(req.body?.profile)
      //   {
      //     check.profilepic=req.body?.profile
      //   }

      // if(req.body?.iaccountID) {
      //     check.iaccountID = req.body?.iaccountID;
      //   }
      //   if(req.body?.ifollowers)
      //   {
      //     check.ifollowers=req.body?.ifollowers;
      //   }
      //   if(req.body?.iposts)
      //   {
      //     check.iposts=req.body?.iposts
      //   }
      //   if(req.body?.ivideoPrice ) {
      //     check.iprice.video = req.body?.ivideo;
      //   }
      //   if(req.body?.iphotoPrice ) {
      //     check.iprice.photo = req.body?.iphotoPrice;
      //   }
      //   if(req.body?.ireelsPrice ) {
      //     check.iprice.reels = req.body?.ireelsPrice;
      //   }

      //   if(req.body?.yaccountID)
      //   {
      //     check.yaccountID=req.body?.yaccountID
      //   }
      //   if(req.body?.yposts)
      //   {
      //     check.yposts=req.body?.yposts
      //   }
      //   if(req.body?.iverification)
      //   {
      //     check.iverification=req.body?.iverification;
      //   }
      //   if(req.body?.yfollowers)
      //   {
      //     check.yfollowers=req.body?.yfollowers
      //   }
      //   if(req.body?.yverification)
      //   {
      //     check.yverification=req.body?.yverification;
      //   }
      //   if(req.body?.yprice)
      //   {
      //     check.uprice=req.body?.yprice
      //   }
      await check.save();
    }
    res.status(200).json({ message: "saved succesfully", data: check });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/bank-details", async (req,res) => {
  try {
    const user = await User.findById(req.user._id);
    user.bankDetails = req.body;
    await user.save();
    return res.status(200).json({message : 'added successfully'});
  } catch (err) {
    return res.status(500).json({message : 'internal server error'})
  }
})

export default router;
