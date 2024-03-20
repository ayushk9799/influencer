
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js';
export const authenticationCheck= async(req,res,next)=>
{
    try{
        const access_token=req.cookies?.jwtaccesstoken;
        if(access_token)
        {
             const d=await jwt.verify(access_token,'influencerChataccess');
             console.log(d);
             req.user=await User.findOne({_id:d._id});
             next();
        }
        else{
          return res.status(401).json({message:"please login"});
        }
    }
    catch(error)
    {
        return res.status(401).json({message:"please login"});

    }
}