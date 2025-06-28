import validator from 'validator'
import bcryptjs from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'
import Counsellor from '../models/counsellor.model.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Appointment from '../models/appointment.model.js'

dotenv.config()

const addCounsellor=async(req,res)=>{
    try{

        const {name,email,password,speciality,degree,experience,about,fees,address_line1,address_line2}=req.body
        const imageFile=req.file

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address_line1 || !address_line2)
        {
            return res.status(400).json({success:false, message:"Enter all the details"})
        }
        if(!validator.isEmail(email))
        {
            return res.status(400).json({success:false, message:"Please enter a valid email"})
        }
        const hashedPassword=bcryptjs.hashSync(password,10)

        const imageUpload=await  cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url

        const counsellorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address_line1,
            address_line2,
            date:Date.now()
        }
        const newCounsellor=new Counsellor(counsellorData)
        await newCounsellor.save()

        res.json({success:true,message:"Counsellor added"})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:"Error in adding counsellor"})
    }
}

const loginAdmin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD)
        {
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else
        res.status(400).json({success:false,message:"Invalid credentials"})
    }
    catch(error){
        console.error(error)
        res.status(400).json({success:false,message:"Cannot login"})
    }
}

const allCounsellors=async(req,res)=>{
    try{
        const counsellors = await Counsellor.find({}).select('-password')
        res.json({success:true,counsellors})
    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentsAdmin=async(req,res)=>{
    try{
        const appointments=await Appointment.find({})
        res.json({success:true,appointments})
    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentCancel=async(req,res)=>{
  try{
    const {appointmentId} =req.body
    const appointmentData=await Appointment.findById(appointmentId)
    await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true})
    const {conId,slotDate,slotTime}=appointmentData
    const counsellorData=await Counsellor.findById(conId)
    let slots_booked=counsellorData.slots_booked
    slots_booked[slotDate]=slots_booked[slotDate].filter(e=> e!==slotTime)
    await Counsellor.findByIdAndUpdate(conId,{slots_booked})
    res.json({success:true,message:'Appointment cancelled'})
  }
  catch(error)
  {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export {addCounsellor, loginAdmin, allCounsellors, appointmentsAdmin, appointmentCancel}