import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentCounsellor, counsellorDashboard, CounsellorList, loginCounsellors } from '../controllers/counsellor.controller.js'
import authCounsellor from '../middlewares/authcounsellor.js'
const router=express.Router()

router.get('/list',CounsellorList)

router.post('/login',loginCounsellors)

router.get('/appointments',authCounsellor,appointmentCounsellor)

router.put('/complete-appointment',authCounsellor,appointmentComplete)

router.put('/cancel-appointment',authCounsellor,appointmentCancel)

router.get('/dashboard',authCounsellor,counsellorDashboard)

export default router