import { Router } from "express"
import { 
    signUp, 
    login, 
    refreshAccessToken 
} from "../controllers/user.controllers.js";

const userRouter = Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.post('/refresh-token', refreshAccessToken)

export default userRouter
