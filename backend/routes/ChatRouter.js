import express from 'express';
import ChatRooms from '../models/chatroom.js';
const router=express.Router();


router.get('/',async (req,res)=>
{

    console.log('chatting');

    try{
        let associatedAccount=req.params.id;
        let loggedinUSer=req.user._id;
       const chatroom=await ChatRooms.findOne({participants:{$all:[associatedAccount,loggedinUSer]}})
       res.status(200).json({chats:chatroom.messages});
       
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send({error:error.message})
    }
   

})

export default router;