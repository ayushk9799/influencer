import ChatRooms from '../models/chatroom.js';
export const databaseChat= async (user1,user2,content)=>
{

  try{
    let ChatRoom =await ChatRooms.findOne({participants:{$all:[user1,user2]}});
if(!ChatRoom)
{
    ChatRoom=new ChatRooms({participants:[user1,user2]});
   await ChatRoom.save();
}
 ChatRoom.messages.push({sender:user1,content:content})
  await ChatRoom.save();

  }
  catch(error)
   {

  }


}