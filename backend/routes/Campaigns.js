import express from "express"
import { Campaign } from "../models/campaigns.js";
const router=express.Router();

router.get("/",async(req,res)=>
{
    try{
        const data=  await Campaign.find({}).populate(
            {
                path:"postedBy",
                select:"name profilePic",

            }
        );
       
        res.status(200).json({data:data})
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
  


})

export default router;