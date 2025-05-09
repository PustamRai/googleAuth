import { User } from "../models/user.models";
import validator from 'validator';
import bcrypt from 'bcrypt'

export const signUp = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    // checking exisiting user
    const exisitingUser = await User.findOne(email)
    if(exisitingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
    
    // validating email format and checking password length
    if(!validator.isEmail(email)) {
        return res.status(404).json({
            success: false,
            message: "Please enter a valid email"
        })
    }

    if(password.length < 3) {
        return res.status(401).json({
            success: false,
            message: "Password length must be greater than 3"
        })
    }

    // hashing plain text password
    const hashPassword = bcrypt.hash(password, 10)

    // user
    const user = await User.create({
        email,
        password: hashPassword
    })

    const userCreated = await User.findById(user._id).select("-password")
    console.log('user: ', userCreated)

    // checking for user creation
    if(!userCreated) {
        return res.status(500).json({
            success: false,
            message: 'User creation failed'
        })
    }

    return res.status(200).json({
        success: true,
        data: userCreated,
        message: "User registered successfully"
    })
}

