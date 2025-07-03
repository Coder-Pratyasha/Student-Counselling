import mongoose from 'mongoose'

const appointmentSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    conId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Counsellor',
        required:true,
    },
    slotDate:{
        type:String,
        required:true
    },
    slotTime:{
        type:String,
        required:true 
    },
    userData:{
        type:Object,
        required:true 
    },
    conData:{
        type:Object,
        required:true 
    },
    amount:{
        type:Number,
        required:true 
    },
    date:{
        type:String,
        required:true 
    },
    cancelled:{
        type:Boolean,
        default:false,
    },
    payment:{
        type:Boolean,
        default:false 
    },
    isCompleted:{
        type:Boolean,
        default:false 
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
        },
    review: {
        type: String,
        default: ''
        }
})

const Appointment = mongoose.model("Appointment",appointmentSchema)
export default Appointment