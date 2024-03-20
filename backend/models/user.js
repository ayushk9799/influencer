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

  followers:
  {
    type:Number,
  
  },
  posts:{
    type:Number,
  },
  profilepic:
  {
    type:String,
  },
  gallery:  // 
  {
    type:String,
  },
  field: {
    type: String,
    enum:['dancing'],
    required: function() {
      return this.contentCreator === true;
    }
  },
  verfication:
  {
    type:Boolean,
    default:false
  },
  associatedAccounts:[
    {
    socialMedia:{
        type:String,
        enum:['You Tube','Instagram'],
    },
    accountID:
    {
        type:String,
        
    }
    

}]

})

export const User = mongoose.model("user", UserSchema);
