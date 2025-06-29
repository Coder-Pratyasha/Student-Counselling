import Counsellor from "../models/counsellor.model.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const changeAvaibility = async(req,res)=> {
    try{
        const {conId} =req.body
        const conData=await Counsellor.findById(conId)
        await Counsellor.findByIdAndUpdate(conId,{available: !conData.available})
        res.json({success:true,message:'Availibility changes'})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
export const CounsellorList=async(req,res)=>{
    try{
        const counsellors=await Counsellor.find({}).select(['-password','-email'])
        res.json({success:true,counsellors})
    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export const loginCounsellors=async(req,res)=>{
    try{
        const {email,password}=req.body
        const counsellor=await Counsellor.findOne({email})
        if(!counsellor)
        {
            return res.json({success:false,message:'Invalid Credentials'})
        }
        else
        {
            const validPassword = bcryptjs.compareSync(password, counsellor.password)
                if(!validPassword)
                {
                    return res.json({success:false,message:'Invalid credentials'})
                }
                    const token=jwt.sign({id:counsellor._id},process.env.JWT_SECRET)
                    res.json({success:true,token,message:'Signin successful'})
                    
        }
    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export default changeAvaibility