import express from 'express';
import  {getMyData, paymentCheckout, getPaymentKey, paymentVerification, getOrders, getOrderDetails, influencerWorkAcceptance, clientWorkApproval}  from '../controller/userController.js';
import {v4} from 'uuid'
import multer from "multer";
import {deleteS3, uploadToS3,presignedUrl} from '../s3.js'

const storage = multer.memoryStorage();
const upload = multer({storage : storage}); 
const router = express.Router();



router.get('/getMyData',getMyData); // get

router.get('/payment/get-key', getPaymentKey);

router.post('/payment/checkout', paymentCheckout);

router.post('/payment/payment-verification', paymentVerification);

router.get('/orders', getOrders);

router.get('/orders/:orderID', getOrderDetails);

router.get('/order/influencer-work-accept/:orderID', influencerWorkAcceptance);

router.get('/order/client-work-approval/:orderID', clientWorkApproval);

router.post('/upload-file', upload.fields([{name : 'profile', maxCount : 1}, {name : 'files', maxCount : 4}]), async(req,res) => {
    const files = req.files;
  const data = req.body;

  if(data.deletedKeys) {
    const deletedKeys = JSON.parse(data.deletedKeys);
    await deleteS3(deletedKeys);
  }

  if (!files || files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  let profileImage = false;
  let key = v4();
  if(files['profile'] && files['profile'][0]) {
    const temp = await (uploadToS3(files['profile'][0], key)); 
    if(temp) {
      profileImage = key;
    }
  }
  
  const images = files['files'];
  const ids = [];
  if(images) {
    for(let i = 0; i < images.length; i++) {
      key = v4();
      const temp = await uploadToS3(images[i], key);
      if(temp) ids.push(key);
    }
  }
  return res.status(200).json({
    profile : profileImage,
    cover : ids
  });
}  );
  router.get('/presigned',async(req,res)=>
  {
       const totalfiles=req.query.total;
      
       try{
        const {keys,urls}=await presignedUrl(totalfiles); 
        res.status(200).json({keys:keys,urls:urls})
       }
       catch(error)
       {
        console.log(error)
        res.status(400).json({error:"error occured"})
       }

  })


  router.get('/delete',async(req,res)=>
  {
    const deletKeys=req.query.delete;
    const deleteKeysArray=deletKeys.split(',')

const value=   await deleteS3(deleteKeysArray);

if(value)
res.status(200).json({deleteStatus:true})
else{
  res.status(400).json({deleteStatus:false})
}
  })
export default router;
