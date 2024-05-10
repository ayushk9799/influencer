import mongoose, { Mongoose } from "mongoose";
const chatroom =new mongoose.Schema({
 
   participants:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',

   }],
   messages: [{
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      content: {
        type: String,
        required: true
      },
      sentAt: {
        type: Date,
        default: Date.now
      },
      type:{
        type:String,
        default:"text/plain"
      }
    }],
});
const ChatRooms= mongoose.model('Chatroom',chatroom);

export default ChatRooms;