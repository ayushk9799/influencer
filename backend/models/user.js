import mongoose, { Schema } from "mongoose";

const UserSchema=new Schema({
  email:{
    type:String,
    required:true,
    unique:true,
  },
  name:{
    type:String,
    required:true,
  },
  contentCreator:
  {
    type:Boolean,
    default:false
  },
  bio:{
    type:String,
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
  profilepic:
  {
    type:String,
  },
  gallery: [ {
    type:String,
  }],
  iverification:
  {
    type:Boolean,
    default:false
  },
  iaccountID: {
      type: String,
  },
  ifollowers: {
      type: Number,
  },
  iposts: {
      type: Number,
      default:0
  },
  iprice:{
    video:{
      type:Number
    },
    photo:{
      type:Number,
    },
    reels:{
      type:Number
    }

  },
  
uaccountID: {
    type: String,
},
ufollowers: {
    type: Number
},
uposts: {
    type: Number
},
uverification:
{
  type:Boolean,
  default:false
},
uprice:
{
     video:{
        type:Number
     }
},
})

export const User = mongoose.model("user", UserSchema);
