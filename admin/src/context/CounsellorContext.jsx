import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const CounsellorContext = createContext()

const CounsellorContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [ctoken,setCtoken]=useState(localStorage.getItem('ctoken')?localStorage.getItem('ctoken'):'')
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false)

    const getAppointments=async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/counsellor/appointments',{headers:{ctoken}})
            if(data.success)
            {
                setAppointments(data.appointments)
                console.log(data.appointments.reverse())
            }
            else
            {
                toast.error(data.message)
            }
        }
        catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }

    const completeAppointment=async(appointmentId)=>{
        try{
            const {data} =await axios.put(backendUrl+'/api/counsellor/complete-appointment',{appointmentId},{headers:{ctoken}})
            if(data.success)
            {
                toast.success(data.message)
                console.log(data.message)
                getAppointments()
            }
            else{
                toast.error(data.message)
            }
        }catch(error)
        {
            toast.error(error.message)
        }
    }
    const cancelAppointment=async(appointmentId)=>{
        try{
            const {data} =await axios.put(backendUrl+'/api/counsellor/cancel-appointment',{appointmentId},{headers:{ctoken}})
            if(data.success)
            {
                toast.success(data.message)

                getAppointments()
            }
            else{
                toast.error(data.message)
                console.log(data.message)
            }
        }catch(error)
        {
            toast.error(error.message)
        }
    }

    const getDashData=async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/counsellor/dashboard',{headers:{ctoken}})
            if(data.success)
            {
                setDashData(data.dashData)
                console.log(data.dashData)
            }
            else
            {
                toast.error(data.message)
            }
        }
        catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProfileData=async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/counsellor/profile',{headers:{ctoken}})
            if(data.success)
            {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }
        }
        catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }
    const value={
        ctoken,setCtoken,backendUrl,appointments,setAppointments,getAppointments,completeAppointment,cancelAppointment,
        dashData,setDashData,getDashData,profileData,setProfileData,getProfileData
    }
    return(
        <CounsellorContext.Provider value={value}>
            {
                props.children
            }
        </CounsellorContext.Provider>
    )
}
export default CounsellorContextProvider