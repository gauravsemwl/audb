import express from 'express'
const router = express.Router()
import asyncHandler from '../middleware/asyncHandler.js'
import Audiobook from '../models/audiobook.js'
import { protect } from '../middleware/authMiddleware.js'


router.get('/', asyncHandler(async (req, res) => {
    console.log("caledddddddddddddddddd")
    const audiobooks = await Audiobook.find({})
    res.json(audiobooks)
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const audiobook = await Audiobook.findById(req.params.id)
    console.log(audiobook)
    if (audiobook) {
        return res.json(audiobook)
    }
    else {
        res.status(404)
        throw new Error('Resource not found')
    }
}))

router.post('/:id/reviews', protect, asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const audiobook = await Audiobook.findById(req.params.id)

    if (audiobook) {
        const alreadyReviewed = audiobook.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        audiobook.reviews.push(review)

        audiobook.numReviews = audiobook.reviews.length

        audiobook.rating =
            audiobook.reviews.reduce((acc, review) => acc + review.rating, 0) /
            audiobook.reviews.length

        await audiobook.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }

}))

export default router