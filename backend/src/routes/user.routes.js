import { Router } from "express"
import { signUp, login } from "../controllers/user.controllers.js";

const userRouter = Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)

export default userRouter
