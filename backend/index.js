import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import connectCloudinary from './cloudinary.js'
dotenv.config()

const app=express()
const PORT=process.env.PORT || 3000

connectCloudinary()


mongoose.connect(process.env.MONGO_URI).then(
    ()=>
    {
        console.log("Database is connected")
    }
).catch((err)=>{
    console.log(err)
})

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Backend running')
})

app.listen(PORT,()=>{
    console.log("Server is running")
})