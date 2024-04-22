import express from "express";
import { InstagramAccount } from "../models/InstagramAccount.js";
import { User } from "../models/user.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
     const check=await InstagramAccount.findOne({user:req.user._id});

     let newData;
     console.log(check)
     if(!check)
     {

        
         newData = new InstagramAccount({
            user: req.user._id,
            accountID: req.body?.accountID,
            "price.video":req.body?.videoPrice?? 0,
             "price.photo":req.body?.photo??0,
             "price.reels":req.body?.reels??0,
             field:req.body?.field,
             region:req.body?.region
          });
        
          await newData.save();
      

     }
     else{

        // 
        check.user=req?.user?._id??check?.user,
        check.accountID= req.body?.accountID??check?.accountID,
        check.price.video=req.body?.videoPrice?? check?.price?.video,
         check.price.photo=req.body?.photo??check?.price?.photo,
         check.price.reels=req.body?.reels??check?.price?.reels,
         check.region=req.body?.region??check?.region,
        await check.save();
        
     }
   
    const updateUser = await User.findById(req.user._id);
    updateUser.InstagramAccount = check?._id??newData?._id;
    await updateUser.save();
    res.json({ messages: "saved succesfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
