import express from 'express'
import { addCounsellor, allCounsellors, loginAdmin } from '../controllers/admin.controller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authadmin.js'

const router=express.Router()

router.post('/add-counsellor',authAdmin,upload.single('image'),addCounsellor)

router.post('/login',loginAdmin)

router.get('/all-counsellors',authAdmin,allCounsellors)

export default router