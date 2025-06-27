import express from 'express'
import { CounsellorList } from '../controllers/counsellor.controller.js'
const router=express.Router()

router.get('/list',CounsellorList)

export default router