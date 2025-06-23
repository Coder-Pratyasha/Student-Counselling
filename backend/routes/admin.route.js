import express from 'express'
import { addCounsellor } from '../controllers/admin.controller.js'
import upload from '../middlewares/multer.js'

const router=express.Router()

router.post('/add-counsellor',upload.single('image'),addCounsellor)

export default router