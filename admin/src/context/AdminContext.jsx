import { createContext, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'

export const AdminContext = createContext()

const AdminContextProvider=(props)=>{
    const [atoken,setAtoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const [counsellors,setCounsellors]=useState([])
    const [appointments,setAppointments] = useState([])
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const getAllCounsellors = async()=>{
        try{
            const {data} =await axios.get(`${backendUrl}/api/admin/all-counsellors`, {headers: {atoken: atoken }});

            if(data.success)
                {
                    setCounsellors(data.counsellors)
            console.log(data.counsellors)
                }
            else
            toast.error(data.message)
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    const changeAvailibility=async(conId)=>{
        try{
            const { data }=await axios.post(backendUrl+'/api/admin/change-availibility', {conId},{headers:{
                atoken
                
            }})
            if(data.success)
                {
                    toast.success(data.message)
                    getAllCounsellors()

                }
                else
                {
                    toast.error(data.message)
                }
        }catch(error)
        {
            toast.error(error.message)
        }
    }

    const getAllAppointments=async(req,re)=>{
        try{
            const {data} =await axios.get(backendUrl+'/api/admin/appointments',{headers:{atoken}})
            if(data.success)
            {
                setAppointments(data.appointments)
                console.log(data.appointments)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    const cancelAppointment=async(appointmentId)=>{
        try{
            const {data} =await axios.post(backendUrl+'/api/admin/cancel-appointment', {appointmentId},{headers:{atoken}})
            if(data.success)
            {
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                toast.error(data.message)
            }
        }catch(error)
        {
            toast.error(error.message)
        }
    }

    const value={
        atoken,setAtoken,backendUrl,counsellors,getAllCounsellors,changeAvailibility,appointments,setAppointments,
        getAllAppointments,cancelAppointment
    }
    return(
        <AdminContext.Provider value={value}>
            {
                props.children
            }
        </AdminContext.Provider>
    )
}
export default AdminContextProvider