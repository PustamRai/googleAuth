import React, { createContext, useContext, useState, useEffect} from "react";


// create context
const AuthContext = createContext()

// create provider
export const AuthProvider = ({ children }) => {


    return(
        <AuthContext.Provider value={{

        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
