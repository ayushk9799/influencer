import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import connectDatabase from "./database.js";
import ChatRouter from "./routes/ChatRouter.js";
import login from "./routes/Login.js";
import UserRouter from "./routes/UserRouter.js";
import cors from "cors";
import http from "http";
import {config} from 'dotenv'
import Razorpay from 'razorpay'
import { databaseChat } from "./controller/databaseChat.js";
import { Server } from "socket.io";
import { authenticationCheck } from "./middleware/authenticationCheck.js";
import { authenticationCheckSocket } from "./middleware/authenticationCheckSocket.js";
import { User } from "./models/user.js";
import searchRouter from "./routes/searchRouter.js";
import AddData from "./routes/AddData.js";
import ChatRooms from "./models/chatroom.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

config({path : "./config/config.env"})

export const instance = new Razorpay({
  key_id : process.env.RAZORPAY_API_KEY,
  key_secret : process.env.RAZORPAY_APT_SECRET
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
connectDatabase();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL, credentials: true },
});
const listOnline = new Map();
io.use(authenticationCheckSocket);
io.on("connection", async (socket) => {
  try {
    let loggedinUSer = socket.user._id;
    loggedinUSer = loggedinUSer.toString();

    if (listOnline.get(loggedinUSer)) {
      listOnline.delete(loggedinUSer);

      listOnline.set(loggedinUSer, socket.id);
    } else {
      listOnline.set(loggedinUSer, socket.id);
    }

    socket.on("message", async (data) => {
      try {
        if (!data?.accountID) {
          throw new Error("User not found");
        }
        let socketReceiver = listOnline.get(data.accountID.toString());

        if (socketReceiver) {
          try {
            io.to(socketReceiver).emit("message", data);

            await databaseChat(loggedinUSer, data.accountID, data.content,data.type);
          } catch (error) {}
        } else {
          await databaseChat(loggedinUSer, data.accountID, data.content,data.type);
        }
      } catch (error) {}
    });

    socket.on("disconnect", () => {
      console.log("disconnect")
      listOnline.delete(loggedinUSer);
    });
  } catch (error) {}
});

//app.use(express.static(path.join(__dirname, '../frontend/build')));
app.options("*", cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use("/auth", login);
app.use("/user", authenticationCheck, UserRouter);
app.use("/getInfluencers", searchRouter);
app.use("/addData", authenticationCheck, AddData);

app.get("/influencers", async (req, res) => {
  try {
    
    const data = await User.findOne({
      uniqueID: { $exists: true, $eq: req.query.uniqueID },
    }).select(
      "-email -mobileNumber -favourites -bankDetails -orders"
    );

    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
});


app.get('/getAllChats',authenticationCheck,async(req,res,next)=>{
  try{
    
        const response=await ChatRooms.find({participants:{$in:[req.user._id]}}).populate({path:'participants',select:"name uniqueID"});
        res.status(200).json({chatsWith:response})
  
       
  }
  catch(error)
  {
         next(error)
  }
})
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
// app.get('/*',(req,res)=>
// {
//     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
//
// })
app.use("/chats", authenticationCheck, ChatRouter);
process.on("warning", (e) => console.warn(e.stack));

server.listen(3000, () => {});
