import mongoose, { Schema } from "mongoose";

const UserSchema=new Schema({
  email:{
    type:String,
    required:true,
    unique:true,
  },
  name:{
    type:String,
    // required:true, 
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
  profilePic:
  {
    type:String,
  },
  gallery: [ {
    type:String,
  }],
  mobileNumber : {
    type : String,
  },
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
  },
  
  yaccountID: {
      type: String,
  },
  yfollowers: {
      type: Number
  },
  yposts: {
      type: Number
  },
  yverification: {
    type:Boolean,
    default:false
  },
  yprice:{
    video:{
      type:Number
    },
  },
  uniqueID:{
    type:String
  },
  order:[{
    type:Schema.Types.ObjectId,
    ref:'order'
  }]
})

UserSchema.pre('save',async function (next)
{
if(this.iaccountID)
{ 
  this.uniqueID=this.iaccountID;

}
else if (this.yaccountID){
  this.uniqueID=this.yaccountID;
}


next();
})
export const User = mongoose.model("user", UserSchema);
