import express from 'express';
import { InstagramAccount } from '../models/InstagramAccount.js';
import { User } from '../models/user.js';
const router= express.Router();


router.post('/',async(req,res)=>
{
    try{
        console.log("oostinggg")
        console.log(req.body)
        const newData= new InstagramAccount({user:req.user._id, accountID:req.body.accountID});
        await newData.save();
        console.log(newData)
        const updateUser=await User.findById(req.user._id);
        updateUser.InstagramAccount=newData.user;
        await updateUser.save();
        res.json({messages:"saved succesfully"})
 }

 catch(error)
 {
    console.log(error);
    res.json({message:error.message})
 }
    }
       
)

export default router;