import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './database.js';
import ChatRouter from './routes/ChatRouter.js';
import {authenticationCheck} from './middleware/authenticationCheck.js'
import login from './routes/Login.js';
import cors from 'cors'
const __dirname = dirname(fileURLToPath(import.meta.url));

    console.log(__dirname);
const app=express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/chat/users',authenticationCheck,ChatRouter);
app.use('/auth',login)
connectDatabase();
app.get('/*',(req,res)=>
{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
    console.log('hello get request');
})
app.listen(3000,()=>
{
    console.log('server running');
})