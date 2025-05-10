import jwt from "jsonwebtoken";
import { User } from "../models/user.models";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided"
      })
    }

    const token = authHeader.split(" ")[1]

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) 
    
    const user = await User.findById(decoded?._id).select("-password -refreshToken")

    if(!user) {
      return res.status(401).json({ 
        success: false, message: "Invalid token" 
      });
    }

    // attach user to request
    req.user = user

    next()
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Token verification failed",
      error: error.message,
    });
  }
};
