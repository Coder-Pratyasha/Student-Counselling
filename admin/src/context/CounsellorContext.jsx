import { createContext } from "react";

export const CounsellorContext = createContext()

const CounsellorContextProvider=(props)=>{
    const value={

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