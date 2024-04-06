import express from 'express';
import  getMyData  from '../controller/getMyData.js';
const router=express.Router();

router.get('/',getMyData);

export default router;
