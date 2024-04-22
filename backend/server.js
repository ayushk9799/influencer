import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './database.js';
import ChatRouter from './routes/ChatRouter.js';
import login from './routes/Login.js';
import UserRouter from './routes/UserRouter.js';
import cors from 'cors'
import http from 'http';
import { databaseChat } from './controller/databaseChat.js';
import { Server } from 'socket.io';
import { authenticationCheck } from './middleware/authenticationCheck.js';
import { authenticationCheckSocket } from './middleware/authenticationCheckSocket.js';
import { User } from './models/user.js';
import searchRouter from './routes/searchRouter.js';
import AddData from './routes/AddData.js'
const __dirname = dirname(fileURLToPath(import.meta.url));

    console.log(__dirname);
const app=express();
app.use(express.json())
connectDatabase();
app.use(cors());   

const server=http.createServer(app);
const io=new Server(server,{cors:{origin:'http://localhost:3001',credentials:true}});
const listOnline=new Map();
const findUser=async(data)=>
{
    try {
        const docs = await User.findOne({ [`associatedAccounts.${0}.accountID`]: data });
        return docs;
      } catch (err) {
        console.log(err);
        return null;
      }

}
 io.use(authenticationCheckSocket);
io.on('connection',async (socket)=>
{
    try{
        let loggedinUSer=socket.user._id;
        loggedinUSer=loggedinUSer.toString();
        console.log(loggedinUSer)
        if(listOnline.get(loggedinUSer))
        {
          console.log('deelting')
          listOnline.delete(loggedinUSer);
          console.log(listOnline)
          listOnline.set(loggedinUSer,socket.id);

        }
        else{
          console.log('not found')
          listOnline.set(loggedinUSer,socket.id)
        }
        console.log("done");
        console.log(listOnline);
        console.log(listOnline.size)
        socket.on('message',async (data)=>
        {   

          console.log('message')
          try{
            let receiverUser= await findUser(data.receiver);
            if(!receiverUser)
            {
                throw new Error('User not found');
            }
             let socketReceiver=listOnline.get((receiverUser._id).toString());
             console.log(socketReceiver)
            if(socketReceiver)
            {
                try{
                    io.to(socketReceiver).emit('message',data.content);
                    console.log(data.content)
                    await   databaseChat(loggedinUSer,receiverUser._id,data.content)
                }
                catch(error)
                {
                    console.log(error)
                }
           
            }
            else{
              await  databaseChat(loggedinUSer,receiverUser._id,data.content)
    
            }
          }
          catch(error)
          {
            console.log(error);
          }
        })
    
    
    socket.on('disconnect',()=>
    {
        listOnline.delete(loggedinUSer);
    })

    }
    catch(error)
    {
        console.log('error');
    }
   

})
//app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/auth',login)
 app.use('/getMyData',authenticationCheck,UserRouter)
 app.use('/getInfluencers',searchRouter);
app.use("/addMoreData", authenticationCheck,AddData)

 app.use((err,req,res,next)=>
 {
  console.log('errrrrr');
  res.status(500).json({error:err.message})
 })
// app.get('/*',(req,res)=>
// {
//     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
//     console.log('hello get reqkuest');
// })
app.use('/chats/:id',authenticationCheck,ChatRouter);
server.listen(3000,()=>
{
    console.log('server running');
})