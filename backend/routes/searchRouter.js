import express from 'express';
const router=express.Router();

router.get('/',(req,res)=>
{

    const {platform,field, fmin , fmax,country,language,gender,}=req.query;
    console.log(platform);
    console.log(field);
    console.log(fmin);
    console.log(fmax);
    console.log(country);
    res.json({message:'hello'});
});

export default router;
