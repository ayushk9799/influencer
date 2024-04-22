import mongoose,{Schema} from 'mongoose';

const YouTubeSchema=new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
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
    price:
    {
         video:{
            type:Number
         }
    }
    

})

export const YouTube = mongoose.model("YouTube", YouTubeSchema);
