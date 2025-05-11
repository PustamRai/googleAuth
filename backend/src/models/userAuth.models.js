import mongoose, { Schema } from "mongoose";

const userAuthSchema = new Schema(
    {
        googleId: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
        },
        
        name: String,
        email: String,
        avatar: String,
    }
)

export const UserAuth = mongoose.model('UserAuth', userAuthSchema)