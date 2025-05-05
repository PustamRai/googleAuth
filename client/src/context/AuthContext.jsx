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
            const response = await API.get('/api/auth/me', {
                withCredentials: true,
            })
            setUser(response.data)

            // console.log('user res: ', response.data)
            toast.success(response.data.message || "Authentication success")
        } catch (error) {
            setUser(null)
            toast.error(error.response.data.message || "Authentication failed")
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
