import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user) {
      next(new Error("user not found in database or try again"));
    } else {
      const data = req.body;
      for (let keys in data) {
        const value = data[keys];
        if(keys === 'yprice') {
          if (!user.yprice) {
            user.yprice = {};
          }
          if (!user.yprice.video) {
            user.yprice.video = {};
          }
          if (!user.yprice.shorts) {
            user.yprice.shorts = {};
          }
          user.yprice.video.price = value.video;
          user.yprice.shorts.price = value.shorts;
        } else if (keys === 'iprice') {
          if (!user.iprice) {
            user.iprice = {};
          }
          if (!user.iprice.reels) {
            user.iprice.reels = { price: 0};
          }
          if (!user.iprice.photo) {
            user.iprice.photo = { price: []};
          }
          if (!user.iprice.story) {
            const temp = value.story;
            const arr = [temp, temp*2, temp*3];
            user.iprice.story = { price: arr};
          }
          user.iprice.reels.price = value.reels;
          if(user.iprice.photo.price.length) {
            user.iprice.photo.price[0] = value.photo;
          } else {
            const temp = value.photo;
            const arr = [temp, temp*2, temp*3];
            user.iprice.photo.price = arr;
          }

          if(user.iprice.story.price.length) {
            user.iprice.story.price[0] = value.story;
          } else {
            const temp = value.story;
            const arr = [temp, temp*2, temp*3];
            user.iprice.story.price = arr;
          }
        } else {
          user[keys] = data[keys]
        }
      }
      const temp = await user.save();
      return res.status(200).json({ message: "saved succesfully", data: temp });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/update-price", async (req,res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log('user', user);
    const {description, key, type, price} = req.body;
    let data;
    if(type === 'Instagram') {
      user.iprice[key] = {price, description};
      data = user.iprice;
    } else {
      user.yprice[key] = {price : description};
      data = user.yprice;
    }
    await user.save();
    return res.status(200).json({message : 'success',  data});
  } catch (err) {
    return res.status(500).json({message : 'internal server error', error : err.message});
  }
})

router.post("/bank-details", async (req,res) => {
  try {
    const user = await User.findById(req.user._id);
    user.bankDetails = req.body;
    await user.save();
    return res.status(200).json({message : 'added successfully'});
  } catch (err) {
    return res.status(500).json({message : 'internal server error'})
  }
})

export default router;
