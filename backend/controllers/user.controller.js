import validator from 'validator'
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

dotenv.config()

export const signup=async(req,res)=>{
        try{
        const {name,email,password}=req.body
        if(!name || !email || !password)
        {
            return res.json({success:false,message:'All fields are required'})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Enter a valid email'})
        }
       const findExistingUser=await User.findOne({email})
       if(findExistingUser)
       {
        return res.json({success:false,message:'User already exists!'})
    }
        const hashedPassword=bcryptjs.hashSync(password,10)

        const newUser= new User({
            name,
            email,
            password:hashedPassword
        })
           const user= await newUser.save()
           const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token,message:'Signup successful'})
            
        }
        catch(error)
        {
            console.log(error)
            res.json({success:false,message:error.message})
        }
    }
    export const signin=async(req,res)=>{
        try{
        const {email,password}=req.body
        if(!email || !password)
        {
            return res.json({success:false,message:'All fields are required'})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Enter a valid email'})
        }
       const validUser=await User.findOne({email})
       if(!validUser)
       {
        return res.json({success:false,message:'No user exists'})
      }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword)
        {
            return res.json({success:false,message:'Invalid credentials'})
        }
           const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
            res.json({success:true,token,message:'Signin successful'})
            
        }
        catch(error)
        {
            console.log(error)
            res.json({success:false,message:error.message})
        }
    }

    export const getprofile=async(req,res)=>{
        try{
            
            const userData=await User.findById(req.user.id).select('-password')
            res.json({success:true,userData})
        }
        catch(error)
        {
            console.log(error)
            res.json({success:false,message:error.message})
        }
    }

    export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    const userId = req.user.id;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }

    const updateData = {
      name,
      phone,
      address,
      dob,
      gender,
    };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      updateData.image = imageUpload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, // returns updated document
      select: '-password', // optional: exclude password field
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
