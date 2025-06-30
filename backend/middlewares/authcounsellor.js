import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authCounsellor=async(req,res,next)=>{
    try{
        const {ctoken} =req.headers
        if(!ctoken)
        {
            return res.json({success:false,message:"Not authorized"})
        }
        const token_decode=jwt.verify(ctoken,process.env.JWT_SECRET)
        
        req.conId = token_decode.id

        next()
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export default authCounsellor