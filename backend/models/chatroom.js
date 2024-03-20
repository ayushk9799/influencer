import mongoose, { Mongoose } from "mongoose";
const chatroom =new mongoose.Schema({
 
   participants:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',

   }],
   messages: [{
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: {
        type: String,
        required: true
      },
      sentAt: {
        type: Date,
        default: Date.now
      }
    }],
});
const ChatRooms= mongoose.model('Chatroom',chatroom);

export default ChatRooms;