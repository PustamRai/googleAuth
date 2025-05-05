import React, { createContext, useContext, useState, useEffect} from "react";
import { API } from "../api/api"
import toast from "react-hot-toast";

// create context
const AuthContext = createContext()

// create provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const fetchUser = async () => {
        try {
            const response = await API.get('/api/auth/me')
            setUser(response.data)

            console.log('user res: ', response.data)
            toast.success(response.data.message || "successful")
        } catch (error) {
            setUser(null)
            toast.error(response.error.data.message || "error")
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return(
        <AuthContext.Provider value={{
            user,
            setUser, 
            fetchUser
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
