import { User } from "../models/user.models.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// methods to generate access and refresh token
const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};


// signup
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // checking exisiting user
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // validating email format and checking password length
    if (!validator.isEmail(email)) {
      return res.status(404).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 3) {
      return res.status(401).json({
        success: false,
        message: "Password length must be greater than 3",
      });
    }

    // hashing plain text password
    const hashPassword = await bcrypt.hash(password, 10);

    // user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const userCreated = await User.findById(user._id).select("-password");
    console.log("user: ", userCreated);

    // checking for user creation
    if (!userCreated) {
      return res.status(500).json({
        success: false,
        message: "User creation failed",
      });
    }

    return res.status(200).json({
      success: true,
      data: userCreated,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("error registering new user: ", error);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesnot exists",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // generate token
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user) 

    // store refreshToken in DB for tracking/logouts:
    user.refreshToken = refreshToken;
    await user.save();

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

   // Set cookie options
  const accessOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 mins
  };

  const refreshOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

    return res
    .status(200)
    .cookie("accessToken", accessToken, accessOptions)
    .cookie("refreshToken", refreshToken, refreshOptions)
    .json({
      success: true,
      data: {
        loggedInUser,
        accessToken,
        refreshToken
      },
      message: "Logged in successfully"
    })
  } catch (error) {
    console.error("error login user: ", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
