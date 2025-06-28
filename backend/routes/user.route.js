import express from 'express'
import { bookAppointment, cancelAppointment, getMyAppointments, getprofile, signin, signup, updateProfile } from '../controllers/user.controller.js'
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



export default router