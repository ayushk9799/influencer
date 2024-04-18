import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js';
export const authenticationCheck= async(req,res,next)=>
{
    try{
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
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
                next(new Error("user not found"))
             }
           
        }
        else{
            console.log("pleease login");
            res.clearCookie('jwtaccesstoken');
          return res.status(401).json({message:"please login"});
        }
    }
    catch(error)
    {
        console.log(error);
        res.clearCookie('jwtaccesstoken');
        console.log("error and login please");
        return res.status(401).json({message:"please login"});

    }
}