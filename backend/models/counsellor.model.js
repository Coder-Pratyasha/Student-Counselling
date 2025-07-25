import mongoose from "mongoose"

const counsellorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        default:true
    },
    fees:{
        type:Number,
        required:true
    },
    address_line1:{
        type:String,
        required:true
    },
    address_line2:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    slots_booked:{
        type:Object,
        default:{}
    }
},{minimize:false})

const Counsellor=mongoose.model("Counsellor",counsellorSchema)

export default Counsellor