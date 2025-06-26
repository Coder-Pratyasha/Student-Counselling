import { createContext, useState } from "react";
import axios from 'axios'

export const AdminContext = createContext()

const AdminContextProvider=(props)=>{
    const [atoken,setAtoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    const [counsellors,setCounsellors]=useState([])
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const getAllCounsellors = async()=>{
        try{
            const {data} =await axios.post(backendUrl+'/api/admin/all-counsellors',{},{headers:{atoken}})
        }
        catch(error)
        {

        }
    }

    const value={
        atoken,setAtoken,backendUrl
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