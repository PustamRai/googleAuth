import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        googleId: {
            type: String,
            required: true,
            unique: true
        },
        
        name: String,
        email: String,
        avatar: String,
        password: String
    }
)

export const User = mongoose.model('User', userSchema)
