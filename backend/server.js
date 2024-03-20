import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './database.js';
import ChatRouter from './routes/ChatRouter.js';
import login from './routes/Login.js';
import cors from 'cors'
import http from 'http';
import { databaseChat } from './controller/databaseChat.js';
import { Server } from 'socket.io';
import { authenticationCheck } from './middleware/authenticationCheck.js';
import { authenticationCheckSocket } from './middleware/authenticationCheckSocket.js';
import { User } from './models/user.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

    console.log(__dirname);
const app=express();
app.use(cors());

const server=http.createServer(app);
const io=new Server(server,{cors:{origin:'*'}});
const listOnline=new Map();
const findUser=async(data)=>
{
    try {
        const docs = await User.findOne({ associatedAccounts: { $elemMatch: { accountID: data } } });
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
        console.log(loggedinUSer)
        listOnline.set(loggedinUSer,socket.id);
        console.log("done");
        socket.on('message',async (data)=>
        {   
            let receiverUser= await findUser(data.receiver);
             let socketReceiver=listOnline.get(receiverUser._id)
            if(socketReceiver)
            {
                try{
                    io.to(socketReceiver).emit('message',data.content);
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
           
            console.log(data.content)
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
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/auth',login)
connectDatabase();
app.get('/hello',(req,res)=>
{
    res.json({hello:"hello"}).status(205);
})
app.get('/*',(req,res)=>
{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
    console.log('hello get request');
})
app.get('/chats/:id',authenticationCheck,ChatRouter);
server.listen(3000,()=>
{
    console.log('server running');
})