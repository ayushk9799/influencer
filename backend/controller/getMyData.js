
const getMyData=async(req,res)=>{
   
    try{
        if(req.user)
        {
           
           res.status(200).json({userDetails:req.user})

        }
        else{
           
            res.status(401).json({message:"Unauthorizedd"});
        }
    }
    catch(error)
    {
        res.status(500).json({message:"Internal Server Error"});
    }
    
}

export default getMyData;

