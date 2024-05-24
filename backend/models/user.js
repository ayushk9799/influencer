import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  contentCreator: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
  },
  field: [
    {
      type: Number,
    },
  ],
  region: {
    type: String,
  },
  gender: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  gallery: [
    {
      type: String,
    },
  ],
  mobileNumber: {
    type: String,
  },
  iverification: {
    type: Boolean,
    default: false,
  },
  iaccountID: {
    type: String,
  },
  ifollowers: {
    type: Number,
  },
  iposts: {
    type: Number,
    default: 0,
  },
  price: Number,
  iprice: {
    reels: {
      price: Number,
      description: String,
    },
    photo: {
      price: [Number],
      description: String,
    },
    story: {
      price: [Number],
      description: String,
    },
  },

  yaccountID: {
    type: String,
  },
  yfollowers: {
    type: Number,
  },
  yposts: {
    type: Number,
  },
  yverification: {
    type: Boolean,
    default: false,
  },
  yprice: {
    video: {
      price: Number,
      description: String,
    },
    shorts: {
      price: Number,
      description: String,
    },
  },
  uniqueID: {
    type: String,
  },
  bankDetails: {
    account: String,
    ifsc: String,
    name: String,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (this.iaccountID) {
    this.uniqueID = this.iaccountID;
  } else if (this.yaccountID) {
    this.uniqueID = this.yaccountID;
  }
  next();
});

UserSchema.pre('save', function (next) {
  
  if(this.isModified('iprice') || this.isModified('yprice')) {
    const prices = [];

    // Collect all iprice values
    if (this.iprice) {
      if (this.iprice.reels) prices.push(this.iprice.reels.price);
      if (this.iprice.photo && this.iprice.photo.price) prices.push(...this.iprice.photo.price);
      if (this.iprice.story && this.iprice.story.price) prices.push(...this.iprice.story.price);
    }

    // Collect all yprice values
    if (this.yprice) {
      if (this.yprice.video) prices.push(this.yprice.video.price);
      if (this.yprice.shorts) prices.push(this.yprice.shorts.price);
    }

    // Find the minimum price and set it
    if (prices.length > 0) {
      this.price = Math.min(...prices);
    }
  }
  next();
})

export const User = mongoose.model("user", UserSchema);
