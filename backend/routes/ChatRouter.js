import express from "express";
import ChatRooms from "../models/chatroom.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    let associatedAccount = req.params.id;
    console.log(req.params)
    let loggedinUSer = req.user._id;
    console.log(associatedAccount)
    console.log(loggedinUSer)
    const chatroom = await ChatRooms.findOne({
      participants: { $all: [associatedAccount, loggedinUSer] },
    });
    console.log(chatroom)
    res.status(200).json({ chats: chatroom?.messages });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
