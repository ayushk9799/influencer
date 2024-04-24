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
import { databaseChat } from "./controller/databaseChat.js";
import { Server } from "socket.io";
import { authenticationCheck } from "./middleware/authenticationCheck.js";
import { authenticationCheckSocket } from "./middleware/authenticationCheckSocket.js";
import { User } from "./models/user.js";
import searchRouter from "./routes/searchRouter.js";
import AddData from "./routes/AddData.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
connectDatabase();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3001", credentials: true },
});
const listOnline = new Map();
const findUser = async (data) => {
  try {
    const docs = await InstagramAccount.findOne({"accountID":data});
    return docs;
  } catch (err) {
    return null;
  }
};
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
        let receiverUser = await findUser(data.accountID);
        if (!receiverUser) {
          throw new Error("User not found");
        }
        let socketReceiver = listOnline.get((receiverUser.user).toString());

        if (socketReceiver) {
          try {
            io.to(socketReceiver).emit("message", data.content);

            await databaseChat(loggedinUSer, receiverUser.user, data.content);
          } catch (error) {}
        } else {
          await databaseChat(loggedinUSer, receiverUser.user, data.content);
        }
      } catch (error) {}
    });

    socket.on("disconnect", () => {
      listOnline.delete(loggedinUSer);
    });
  } catch (error) {}
});
//app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use("/auth", login);
app.use("/getMyData", authenticationCheck, UserRouter);
app.use("/getInfluencers", searchRouter);
app.use("/addData", authenticationCheck, AddData);
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
// app.get('/*',(req,res)=>
// {
//     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
//
// })
app.use("/chats/:id", authenticationCheck, ChatRouter);
server.listen(3000, () => {});
