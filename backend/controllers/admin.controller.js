import validator from 'validator'
import bcryptjs from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'
import Counsellor from '../models/counsellor.model.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

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

export {addCounsellor, loginAdmin}