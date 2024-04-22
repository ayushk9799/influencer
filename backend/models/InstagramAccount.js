import mongoose,{Schema} from 'mongoose';

const InstagramAccountSchema=new Schema({
     user:{
        type:Schema.Types.ObjectId,
        ref:'User'
     },
    verification:
    {
      type:Boolean,
      default:false
    },
    accountID: {
        type: String,
        required: true
    },
    followers: {
        type: Number
    },
    posts: {
        type: Number
    },
    price:{
      video:{
        type:Number
      },
      photo:{
        type:Number,
      },
      reels:{
        type:Number
      }

    }

})

export const InstagramAccount = mongoose.model("InstagramAccount", InstagramAccountSchema);
