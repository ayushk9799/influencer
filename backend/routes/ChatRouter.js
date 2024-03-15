import express from 'express';
import {makeRoom} from '../controller/chatcontroller.js'
const router=express.Router();
router.post('/:id',makeRoom)



export default router;