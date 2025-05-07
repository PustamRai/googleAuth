import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import session from 'express-session'
import passport from './config/password.js'
import MongoStore from 'connect-mongo'
import userRouter from './routes/auth.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8002

// middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

// proxy
app.set("trust proxy", 1);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, // MongoDB URI (Atlas/local)
        collectionName: 'sessions',
        ttl: 24 * 60 * 60, // 1 day in seconds
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production", // true if using HTTPS
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
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
