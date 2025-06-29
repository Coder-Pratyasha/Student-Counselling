import express from 'express'
import { CounsellorList, loginCounsellors } from '../controllers/counsellor.controller.js'
const router=express.Router()

router.get('/list',CounsellorList)

router.post('/login',loginCounsellors)

export default router