import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.post("/", async (req, res,next) => {
  try {
     const check=await User.findById(req.user._id);    
    
    //  console.log(check)
    // let check=0;
     if(!check)
     {
        next(new Error("user not found in database or try again"))
     }
     else{

        if(req.body?.bio)
        {
          check.bio=req.body?.bio
        }
        if (req.body?.gender) {
            check.gender = req.body?.gender;
          }
          if (req.body?.region) {
            check.region = req.body?.region;
          }
        
          if(req.body?.field)
          {
            check.field=req.body?.field
          }
          if(req.body?.profilepic)
          {
            check.profilepic=req.body?.profilepic
          }
       
        if(req.body?.iaccountID) {
            check.iaccountID = req.body?.iaccountID;
          }
          if(req.body?.ifollowers)
          {
            check.ifollowers=req.body?.ifollowers;
          }
          if(req.body?.iposts)
          {
            check.iposts=req.body?.iposts
          }
          if(req.body?.ivideoPrice ) {
            check.iprice.video = req.body?.ivideoPrice;
          }
          if(req.body?.iphotoPrice ) {
            check.iprice.photo = req.body?.iphotoPrice;
          }
          if(req.body?.ireelsPrice ) {
            check.iprice.reels = req.body?.ireelsPrice;
          }
         
          if(req.body?.uaccountID)
          {
            check.uaccountID=req.body?.uaccountID
          }
          if(req.body?.uposts)
          {
            check.uposts=req.body?.uposts
          }
          if(req.body?.iverification)
          {
            check.iverification=req.body?.iverification;
          }
          if(req.body?.ufollowers)
          {
            check.ufollowers=req.body?.ufollowers
          }
          if(req.body?.uverification)
          {
            check.iverification=req.body?.uverification;
          }
          if(req.body?.uvideoPrice)
          {
            check.uprice=req.body?.uvideoPrice
          }
        await check.save();
        
     }
      
    res.json({ messages: "saved succesfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
