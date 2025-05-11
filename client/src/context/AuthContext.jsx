import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "../api/api";
import toast from "react-hot-toast";

// create context
const AuthContext = createContext();

// create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //* google auth
  // get user
  const fetchUser = async () => {
    try {
      const response = await API.get("/api/auth/me", {
        withCredentials: true,
      });
      setUser(response.data);

      // console.log('user res: ', response.data)
      toast.success(response.data.message || "Authentication success");
    } catch (error) {
      setUser(null);
      console.log("Authentication failed: ", error.message);
      // toast.error(error.response.data.message || "Authentication failed")
    }
  };

  useEffect(() => {
    fetchUser();
  }, [setUser]);

  // logout
  const logout = async () => {
    try {
      const response = await API.get("/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      toast.success(response.data.message || "Logged out successfully");
    } catch (error) {
      console.log("error in logout: ", error.message);
      toast.error(error.response.data.message || "Logout failed");
    }
  };

  //* user auth
  const signUp = async (credentials) => {
    try {
      const response = await API.post("/api/auth/signUp", credentials, {
        withCredentials: true,
      });

      console.log("signup res: ", response);
    } catch (error) {
      console.log("error in signup: ", error);
      toast.error(error.response);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
