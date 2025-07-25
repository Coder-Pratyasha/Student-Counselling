import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authUser=async(req,res,next)=>{
    try{
        const {token} =req.headers
        if(!token)
        {
            return res.json({success:false,message:"Not authorized"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        
        req.user = { id: token_decode.id }

        next()
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export default authUser