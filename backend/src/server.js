import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import session from 'express-session'
import passport from './config/password.js'
import userRouter from './routes/auth.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8002

// middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        secure: true
    }
}))

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// end points
app.use('/api/auth', userRouter)


app.get('/', (req, res) => {
    res.send('welcome to google authentication')
})

// connect to db
connectDB()
.then(() => {
    app.listen(PORT, (req, res) => {
    console.log(`server is running at port ${PORT}`)
    })
})
.catch((err) => {
    console.log('mongoDB connection failed: ', err.message)
    process.exit(1) // process code 1 means exit with failure, 0 means success
}) 
