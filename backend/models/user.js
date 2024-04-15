import mongoose, { Schema } from "mongoose";


const UserSchema=new Schema({
  email:{
    type:String,
    required:true,
    unique:true,
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
  field: [{
    type: String,
  }],
  verification:
  {
    type:Boolean,
    default:false
  },
  associatedAccounts:{
    socialMedia:{
        type:String,
        enum:['You Tube','Instagram'],
    },
    accountID:
    {
        type:String, 
    }, 
    followers:
    {
      type:Number,
    
    },
    posts:{
      type:Number,
    },
}

})

export const User = mongoose.model("user", UserSchema);
