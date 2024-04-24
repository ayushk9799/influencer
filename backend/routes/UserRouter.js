import express from 'express';
import  {getMyData, uploadFiles}  from '../controller/getMyData.js';
import {v4} from 'uuid'
import multer from "multer";
import {deleteS3, uploadToS3} from '../s3.js'

const storage = multer.memoryStorage();
const upload = multer({storage : storage});
const router=express.Router();

router.get('/',getMyData); // get

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

  if(files['profile'] && files['profile'][0]) {
    await (uploadToS3(files['profile'][0], 'profile')); 
    profileImage = true;
  }
  
  const images = files['files'];
  const ids = [];
  if(images) {
    for(let i = 0; i < images.length; i++) {
      let key = v4();
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
