import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8002

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

// middlewares
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('welcome to google authentication')
})
