import mongoose,{Schema} from 'mongoose';
const InstagramAccountSchema=new Schema({
     user:{
        type:Schema.Types.ObjectId,
        ref:'user'
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
        type: Number,
    },
    posts: {
        type: Number,
        default:0
    },
    field: [{
        type: String,
      }],
      region:{
        type:String,
      },
      gender:{
        type:String,
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
