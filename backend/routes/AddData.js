import express from "express";
import { User } from "../models/user.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log("post");
    let user = await User.findById(req.user._id);
   console.log(user)
    if (!user) {
      next(new Error("user not found in database or try again"));
    } else {
      const data = req.body;
       console.log("data");
       console.log(data);
      for (let keys in data) {
        const value = data[keys];
        if (keys === "yprice") {
          if (value.video) {
            user.yprice.video = {
              price: value.video.price,
              description: "deconcon",
            };
          } else {
            user.yprice.video = { price: 0, description: "hello" };
          }

          if (value.shorts) {
            user.yprice.shorts = {
              price: value.shorts.price,
              description: "deconcon",
            };
          } else {
            user.yprice.shorts = { price: 0, description: "hello" };
          }
        } else if (keys === "iprice") {
          if (value.reels) {
            user.iprice.reels = {
              price: value.reels?.price ? value.reels?.price : 0,
              description: "descrption money involved",
            };
          } else {
            user.iprice.reels = {
              price: 0,
              description: "descrption money involved",
            };
          }

          if (value.photo) {
            if (Array.isArray(value.photo.price)) {
              if (value.photo.price?.length) {
                user.iprice.photo.price = value.photo.price;
              }
            } else {
              const temp = value.photo.price;
              const arr = [temp * 1, temp * 2, temp * 3];
              user.iprice.photo.price = arr;
            }
          } else {
            user.iprice.photo.price = [0, 0, 0];
            user.iprice.photo.description = "hello";
          }
          if (value.story) {
            if (Array.isArray(value.story.price)) {
              if (value.story.price?.length) {
                user.iprice.story.price = value.photo.price;
              }
            }
           
          else{
            const temp = Number(value.story.price);
            const arr = [temp*1, temp*2, temp*3];
            console.log(arr)
            user.iprice.story.price = arr;
          }
          }
          else{
            user.iprice.story.price = [0,0,0]
            user.iprice.story.description="hello"
          }
        } else {
          user[keys] = data[keys];
        }
      }
      const temp = await user.save();
      return res.status(200).json({ message: "saved succesfully", data: temp });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

router.post("/update-price", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("user", user);
    const { description, key, type, price } = req.body;
    
    let data;
    if (type === "Instagram") {
      console.log(key)
      console.log(price)
      user.iprice[key] = { price, description };
      data = user.iprice;
    } else {
      user.yprice[key] = { price, description };
      data = user.yprice;
    }
    await user.save();
    return res.status(200).json({ message: "success", data });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
});

router.post("/bank-details", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.bankDetails = req.body;
    await user.save();
    return res.status(200).json({ message: "added successfully" });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;
