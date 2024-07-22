import express from 'express'
const router = express.Router()
import User from '../models/user.js'
import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/generateToken.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    console.log(userExists)

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    console.log(name)
    const user = await User.create({
        name,
        email,
        password
    })


    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}))

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)


        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }

}))

router.post('/logout', protect, asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'Logged out Successfully' })
}))

export default router