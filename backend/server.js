import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

    console.log(__dirname);
const app=express();
app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get('/',(req,res)=>
{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})
app.listen(3000,()=>
{
    console.log('server running')
})