import { createContext } from "react";
import { counsellors } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider=(props)=>{

    const value={
        counsellors
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider