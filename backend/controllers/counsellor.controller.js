import Counsellor from "../models/counsellor.model.js"

const changeAvaibility = async(req,res)=> {
    try{
        const {conId} =req.body
        const conData=await Counsellor.findById(conId)
        await Counsellor.findByIdAndUpdate(conId,{available: !conData.available})
        res.json({success:true,message:'Availibility changes'})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
export default changeAvaibility