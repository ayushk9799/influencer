import {
    PutObjectCommand,
    S3Client,
    DeleteObjectsCommand
  } from '@aws-sdk/client-s3'
  
  const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: 'AKIAVRUVSJHVG4OBAKFK',
      secretAccessKey: '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',
    },
  });
  
export  const uploadToS3 = async (file, id) => {
    const command = new PutObjectCommand({
      Bucket: 'thousand-ways',
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
      Bucket : 'thousand-ways',
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

  
  