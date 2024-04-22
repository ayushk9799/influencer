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
  bio:{
    type:String,
  },
  gender:{
    type:String,
  },
  contentCreator:
  {
    type:Boolean,
    default:false
  },
  profilepic:
  {
    type:String,
  },
  gallery: [ {
    type:String,
  }]  
 ,
 

InstagramAccount:{
  type:Schema.Types.ObjectId,
  ref:'InstagramAccount'
},
YouTube:{
  type:Schema.Types.ObjectId,
  ref:'YouTube'
},
})

export const User = mongoose.model("user", UserSchema);
