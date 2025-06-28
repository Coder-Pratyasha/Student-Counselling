import express from 'express'
import { addCounsellor, allCounsellors, appointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/admin.controller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authadmin.js'
import changeAvaibility from '../controllers/counsellor.controller.js'

const router=express.Router()

router.post('/add-counsellor',authAdmin,upload.single('image'),addCounsellor)

router.post('/login',loginAdmin)

router.get('/all-counsellors',authAdmin,allCounsellors)

router.post('/change-availibility',authAdmin,changeAvaibility)

router.get('/appointments',authAdmin,appointmentsAdmin)

router.post('/cancel-appointment',authAdmin,appointmentCancel)
export default router