import crypto from 'crypto';
import ChatRooms from '../models/chatroom.js';
export const makeRoom= async (req,res,next)=>
{
    const user1 =req.user._id;
    const user2=req.params._id;
    const participants=[user1,user2];
    let sortedStrings = [user1, user2].sort((a, b) => a.localeCompare(b));
    const combined = sortedStrings.join('');

  let hash = crypto.createHash('sha256').update(combined).digest('hex');

  hash= hash.slice(0, 16);
const checkRooms =await ChatRooms.findById(hash);
let newChatRoom;
if(!checkRooms)
{
    newChatRoom=new ChatRooms({_id:hash,participants:participants});
    newChatRoom.save();
}
else{
  


}

}