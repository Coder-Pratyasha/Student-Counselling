import { useState } from "react";
import { createContext } from "react";

export const CounsellorContext = createContext()

const CounsellorContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [ctoken,setCtoken]=useState(localStorage.getItem('ctoken')?localStorage.getItem('ctoken'):'')
    const value={
        ctoken,setCtoken,backendUrl
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