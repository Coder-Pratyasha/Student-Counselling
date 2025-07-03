import validator from 'validator'
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import Counsellor from '../models/counsellor.model.js'
import Appointment from '../models/appointment.model.js'
import razorpay from 'razorpay'
import { sendEmail } from '../sendMail.js'

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
           await sendEmail(
                email,
                'Welcome to Counselling Portal',
                `<h2>Welcome, ${name}!</h2>
                <p>Your account has been successfully created.</p>
                <p>You can now book appointments with our counsellors easily.</p>
                <br/>
                 <p>Regards,<br/>Team Counselling Portal</p>`
           )
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
      new: true, 
      select: '-password',
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

export const bookAppointment= async(req,res)=>{
  try{
    const {conId,slotDate,slotTime}=req.body
    const userId=req.user.id
    const conData=await Counsellor.findById(conId).select('-password')
    if(!conData.available){
      return res.json({success:false,message:'Counsellor not available'})
    }
    let slots_booked=conData.slots_booked

    if(slots_booked[slotDate]){
    if(slots_booked[slotDate].includes(slotTime)){
      return res.json({success:false,message:'Slot not available'})
    }
    else
    {
      slots_booked[slotDate].push(slotTime)
    }
  }
  else
  {
    slots_booked[slotDate]=[]
    slots_booked[slotDate].push(slotTime)
  }

  const userData=await User.findById(userId).select('-password')
  delete conData.slots_booked
  const appointmentData = {
    userId,conId,userData,conData,amount:conData.fees,slotTime,slotDate,date:Date.now()
  }
  const newAppointment=new Appointment(appointmentData)
  await newAppointment.save()

  await Counsellor.findByIdAndUpdate(conId,{slots_booked})

   await sendEmail(
                userData.email,
                'Appointment Confirmation',
                `<h2>Welcome, ${userData.name}!</h2>
                <p>Your payment of Rs.${conData.fees} is successful.</p>
                 <p>Your appointment has been confirmed with ${conData.name} on ${slotDate} at ${slotTime} .</p>
                <br/>
                 <p>Regards,<br/>Team PathPilot</p>`
           )

  res.json({success:true,message:'Appointment Booked'})

  }catch(error)
  {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const cancelAppointment=async(req,res)=>{
  try{
    const {appointmentId} =req.body
    const userId=req.user.id
    const appointmentData=await Appointment.findById(appointmentId)
    if(appointmentData.userId!=userId)
    {
      return res.json({success:false,message:'Unauthorized action'})
    }
    await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true})
    const {conId,slotDate,slotTime}=appointmentData
    const counsellorData=await Counsellor.findById(conId)
    let slots_booked=counsellorData.slots_booked
    slots_booked[slotDate]=slots_booked[slotDate].filter(e=> e!==slotTime)
    await Counsellor.findByIdAndUpdate(conId,{slots_booked})

    const userData=await User.findById(userId)
    await sendEmail(
                userData.email,
                'Appointment Cancelled',
                `<h2>Welcome, ${userData.name}!</h2>
                 <p>Your appointment has been cancelled with ${counsellorData.name} on ${slotDate} at ${slotTime} .</p>
                <br/>
                 <p>Regards,<br/>Team PathPilot</p>`
           )


    res.json({success:true,message:'Appointment cancelled'})
  }
  catch(error)
  {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

const razorpayInstance=new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
})
export const paymentRazorpay=async(req,res)=>{
  try{
      const {appointmentId}=req.body
  const appointmentData=await Appointment.findById(appointmentId)
  if(!appointmentData || appointmentData.cancelled)
  {
    return res.json({success:false,message:'Appointment cancelled or not found'})
  }
  const options={
    amount:appointmentData.amount*100,
    currency:process.env.CURRENCY,
    receipt:appointmentId
  }
  const order= await razorpayInstance.orders.create(options)
  res.json({success:true,order})
  }
  catch(error)
  {
     console.log(error)
    res.json({success:false,message:error.message})
  }


}

export const verifyRazorPay=async(req,res)=>{
  try{
    const {razorpay_order_id}=req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid')
    {
      await Appointment.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:true,message:'Payment successful'})
    }
    else
    {
      res.json({success:false,message:'Payment failed'})
    }
  }
  catch(error)
  {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
export const rateAppointment = async (req, res) => {
  try {
    const { appointmentId, rating, review } = req.body;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.userId.toString() !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    if (appointment.rating) {
      return res.json({ success: false, message: 'You already rated this appointment' });
    }

    appointment.rating = rating;
    if (review) appointment.review = review;

    await appointment.save();

    res.json({ success: true, message: 'Thank you for your feedback!' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
