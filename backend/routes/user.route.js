import express from 'express'
import { bookAppointment, cancelAppointment, getMyAppointments, getprofile, paymentRazorpay, signin, signup, updateProfile, verifyRazorPay, rateAppointment } from '../controllers/user.controller.js'
import authUser from '../middlewares/authuser.js'
import upload from '../middlewares/multer.js'

const router=express.Router()

router.post('/signup',signup)

router.post('/signin',signin)

router.get('/get-profile',authUser,getprofile)

router.put('/update-profile',upload.single('image'),authUser,updateProfile)

router.post('/book-appointment',authUser,bookAppointment)

router.get('/my-appointments', authUser, getMyAppointments);

router.post('/cancel-appointment',authUser,cancelAppointment)

router.post('/payment-razorpay',authUser,paymentRazorpay)

router.post('/verifyRazorpay',authUser,verifyRazorPay)

router.post('/rate',authUser,rateAppointment)



export default router