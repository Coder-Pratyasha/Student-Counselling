import validator from 'validator'
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

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
