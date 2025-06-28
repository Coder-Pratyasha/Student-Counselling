import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import  {toast} from 'react-toastify'
 
export const AppContext = createContext()

const AppContextProvider=(props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [counsellors,setCounsellors]=useState([])
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData,setUserData]=useState(false)

    const getCounsellorsdata=async(req,res)=>{
        try{
            const {data} =await axios.get(backendUrl+'/api/counsellor/list')
            if(data.success)
            {
                setCounsellors(data.counsellors)

            }
            else
            {
                toast.error(data.message)
            }
        }catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const loadUserProfileData=async(req,res)=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
            if(data.success)
            {
                setUserData(data.userData)
            }
            else
            {
                console.log(error)
                toast.error(error.message)
            }
        }
        catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }
    const value={
        counsellors,
        getCounsellorsdata,
        token,
        setToken,backendUrl,
        userData,setUserData,
        loadUserProfileData
    }

    useEffect(()=>{
        getCounsellorsdata()
    },[])
    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else
        {
            setUserData(false)
        }
    },[token])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

    
}
export default AppContextProvider