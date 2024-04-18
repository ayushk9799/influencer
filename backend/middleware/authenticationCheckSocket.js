import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js';
export const authenticationCheckSocket= async(socket,next)=>
{
    try{
        // console.log(socket.request.headers.cookie)
        const cookies=cookie.parse(socket.request.headers.cookie);
        const access_token = cookies.jwtaccesstoken;
        console.log("authsocket")
        console.log(access_token)
        if(access_token)
        {

            try{
                console.log('hello');
                console.log("socket")
                const d= jwt.verify(access_token,'influencerChataccess');
                console.log(d);
                socket.user=await User.findOne({_id:d._id});
                console.log(socket.user);
                next();

            }
            catch(error)
            {
                console.log(error.message)
                next(new Error("not acceptable"))
            }
            
        }
        else{
            console.log('errrrr')
            next(new Error("authenticate please"))
        }
    }
    catch(error)
    {

        console.log(error.message)
        next(new Error("authenticate please"))

    }
}