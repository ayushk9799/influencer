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
