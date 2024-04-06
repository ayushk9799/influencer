
const getMyData=async(req,res)=>{
   
    try{
        if(req.user)
        {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
           res.status(200).json({userDetails:req.user})

        }
        else{
            res.status(401).json({message:"Unauthorized"});
        }
    }
    catch(error)
    {
        res.status(500).json({message:"Internal Server Error"});
    }
    
}

export default getMyData;

