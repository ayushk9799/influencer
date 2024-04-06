import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js';
export const authenticationCheck= async(req,res,next)=>
{
    try{
         
        const cookies=cookie.parse(req.headers.cookie);
        const access_token=cookies?.jwtaccesstoken;
        console.log(access_token);
        if(access_token)
        {

            console.log(access_token);
             const d=await jwt.verify(access_token,'influencerChataccess');
             console.log("hello")
             console.log(d);
             req.user=await User.findOne({_id:d._id});
             if(req.user)
             {
                console.log(req.user);
             next();
             }
             else{
                console.log('else part')
                throw new Error("user not found")
             }
           
        }
        else{
            console.log("pleease login")
          return res.status(401).json({message:"please login"});
        }
    }
    catch(error)
    {
        console.log(error)
        console.log("error and login please")
        return res.status(401).json({message:"please login"});

    }
}