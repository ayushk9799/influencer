import mongoose, { Schema } from "mongoose";

const campaignSchema = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  },
  amount:{
    type:Number,
    required:true
  },
  influencersRequired:{
    type:Number
  },
  influencersRecruited:{
    type:Number
  },
  criteria: {
    followerCount: {
        min: {
          type: Number,
          required: true
        },
        max: {
          type: Number,
          required: true
        }
      },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Any'], 
    },
    platform: {
      type: String,
      enum: ['Instagram', 'YouTube'], 
      required: true
    },
    fields: [{
      type:Number
    }]
  },
 
   title:{
    type:String,
   },
   description:{
    type:String,
   },
   images:[{type:String}],
   videos:[{type:String}]
 
}, {
  timestamps: true ,
});

export const Campaign = mongoose.model('Campaign', campaignSchema);

