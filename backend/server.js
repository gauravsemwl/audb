import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import audiobooksRouter from './routes/audiobooksRoutes.js'
import userRouter from './routes/userRoutes.js'
const port = process.env.PORT || 5000

await connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())




app.use('/api/audiobooks', audiobooksRouter)
app.use('/api/users', userRouter)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}
else {
    app.get('/', (req, res) => {
        res.send('apiiii')
    })
}

app.use(notFound)
app.use(errorHandler)

app.listen(5000, () => {
    console.log('Server running on port ' + port)
})