import {
    PutObjectCommand,
    S3Client,
    DeleteObjectsCommand
  } from '@aws-sdk/client-s3'
  
  const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: process.env.RAZORPAY_API_KEY,
      secretAccessKey: process.env.RAZORPAY_APT_SECRET,
    },
  });
  
export  const uploadToS3 = async (file, id) => {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: id,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
  
    try {
      await s3.send(command);
      return true;
    } catch (err) {
      return false;
    }
  };

 export const deleteS3 = async (keys) => {
    const objects = keys.map(key => ({ Key: key }));
    const command = new DeleteObjectsCommand({
      Bucket : process.env.AWS_BUCKET_NAME,
      Delete : {
        Objects : objects
      }
    });
    try {
      await s3.send(command);
      return true;
    } catch (err) {
      return false;
    }
  }