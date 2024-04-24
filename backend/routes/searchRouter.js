import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.get("/search", async (req, res) => {
  // const { platform, field, fmin, fmax, region,gender } = req.query;
  // console.log(platform);
  // console.log(field);
  // console.log(fmin);
  // console.log(fmax);
  // console.log(country);
  // console.log(gender)
try{
  // if(platform==="instagram")
  // {
  //   const data= await InstagramAccount.find({}).populate({path:'user'});

  //   res.json({data:data})
  // }
  // else{

  //   //youtube route not made 
  //   res.json({
  //     deicded:"not decided"
  //   })
  // }

  res.json({data:data})
}
catch(error)
{
  res.status(500).json({error:error.message})
  console.log(error)
}
  

 
});

// router.get("/featured/platform/instagram", async (req, res) => {
//   const data = await InstagramAccount.find().populate({path:'user',select:'-email'})
//   res.json({ data: data });
// });

router.get("/featured/platform/youtube", (req, res) => {});

export default router;
