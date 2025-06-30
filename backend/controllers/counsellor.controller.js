import Counsellor from "../models/counsellor.model.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import Appointment from "../models/appointment.model.js"
import mongoose from 'mongoose'

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

export const appointmentCounsellor = async (req, res) => {
  try {
    const conId = new mongoose.Types.ObjectId(req.conId);

    const appointments = await Appointment.find({ conId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const appointmentComplete=async(req,res)=>{
    try{
        const {appointmentId} = req.body
        const conId=req.conId
        const appointmentData = await Appointment.findById(appointmentId)
        if(appointmentData && appointmentData.conId.toString()===conId.toString())
        {
            await Appointment.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:'Appointment Completed'})
        }
        else{
            return res.json({success:false,message:"Completion Failed"})
        }
    }
    catch(error)
    {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
export const appointmentCancel=async(req,res)=>{
    try{
        const {appointmentId} = req.body
        const conId=req.conId
        const appointmentData = await Appointment.findById(appointmentId)
        if(appointmentData && appointmentData.conId.toString()===conId.toString())
        {
            await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:'Appointment Cancelled'})
        }
        else{
            return res.json({success:false,message:"Cancellation Failed"})
        }
    }
    catch(error)
    {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export const counsellorDashboard=async(req,res)=>{
    try{
        const conId=req.conId
        const appointments=await Appointment.find({conId})
        let earning=0
        appointments.map((item)=>{
            if(item.isCompleted || item.payment)
            {
                earning+=item.amount
            }
    })
        let students=[]
        appointments.map((item)=>{
            if(!students.includes(item.userId))
            {
                students.push(item.userId)
            }
    })
    const dashData={
        earning,appointments:appointments.length,
        students:students.length,
        latestAppointments:appointments.reverse()
    }
    res.json({success:true,dashData})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

export const counsellorProfile=async(req,res)=>{
    try{
        const conId=req.conId
        const profileData=await Counsellor.findById(conId).select('-password')
        res.json({success:true,profileData})

    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export const updateProfile=async(req,res)=>{
    try{
        const {fees,address_line1,address_line2,available}=req.body
        const conId=req.conId
        await Counsellor.findByIdAndUpdate(conId,{fees,address_line1,address_line2,available})
        res.json({success:true,message:'Profile updated'})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default changeAvaibility