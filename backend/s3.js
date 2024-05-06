import {
    PutObjectCommand,
    S3Client,
    DeleteObjectsCommand
  } from '@aws-sdk/client-s3'
  import {v4} from 'uuid';
  import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
  const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: 'AKIAVRUVSJHVG4OBAKFK',
      secretAccessKey: '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',
    },
  });
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: 'AKIAVRUVSJHVE4EOT5UB',
      secretAccessKey: '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'
    },
    region: 'ap-south-1'
  });

  //most probably ot be deleted (handles uplaod from client to server to s3)
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

  //presigned URl implemnetation will work in both public and private (private not tested ,bucket policy i dont know)
export const presignedUrl=async (total)=>
{
  const keys=[];
  const urls=[];

  for (let i=0;i<total;i++)
  {
    const key=v4();
    const ObjectParams = {
      Bucket: 'signedayush',
      Key:key,
    };
    const expiresIn=3600;
    const command = new PutObjectCommand(ObjectParams);
    try{
      const url=  await getSignedUrl(
        s3Client,
        command,
        { expiresIn }
      );

      keys.push(key);
      urls.push(url);
    }
    catch(error)
    { console.log(error)
        keys.push(key)
        urls.push(-1)
    }  
  }
   
  return {keys:keys,urls:urls}
}


// not presigned but will work if bucket public 
 export const deleteS3 = async (keys) => {
    const objects = keys.map(key => ({ Key: key }));
    const command = new DeleteObjectsCommand({
      Bucket : 'signedayush',
      Delete : {
        Objects : objects
      }
    });
    try {
      await s3Client.send(command);
      return true;
    } catch (err) {
      return false;
    }
  }

  
  