import express from 'express';
import  {getMyData, paymentCheckout, getPaymentKey, paymentVerification}  from '../controller/userController.js';
import {v4} from 'uuid'
import multer from "multer";
import {deleteS3, uploadToS3} from '../s3.js'

const storage = multer.memoryStorage();
const upload = multer({storage : storage});
const router = express.Router();

router.get('/getMyData',getMyData); // get

router.get('/payment/get-key', getPaymentKey);

router.post('/payment/checkout', paymentCheckout);

router.post('/payment/payment-verification', paymentVerification);

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

export default router;
