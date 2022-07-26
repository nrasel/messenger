const jwt=require('jsonwebtoken')
module.exports.authMiddleware=async(req,res,next)=>{
   const {authToken}=req.cookies;
   if(authToken){
    const deCodeToken = await jwt.verify(authToken,'abcd1234');
    req.myId=deCodeToken.id
    next()
   }else{
    res.status(404).json({error:{errorMessage:['Please login']}});
   }
}