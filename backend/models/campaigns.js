import mongoose, { Schema } from "mongoose";

const campaignSchema = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  },
  amount:{
    type:Number,
    
  },
 
  criteria: {
    followerCount: {
        min: {
          type: Number,
        
        },
        max: {
          type: Number,
        }
      },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Any'], 
    },
    platform: {
      type: [String],
      enum: ['Instagram', 'YouTube'],
      default: ['Instagram', 'YouTube']
    },
    fields: [{
      type:String
    }]
  },
 
   title:{
    type:String,
   },
   description:{
    type:String,
   },
   images:[{type:String}],
  
 
}, {
  timestamps: true ,
});

export const Campaign = mongoose.model('Campaign', campaignSchema);

