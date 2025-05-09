import mongoose, { Schema } from "mongoose";

const userAuthSchema = new Schema(
    {
        googleId: {
            type: String,
            required: true,
            unique: true
        },
        
        name: String,
        email: String,
        avatar: String,
    }
)

export const UserAuth = mongoose.model('UserAuth', userAuthSchema)