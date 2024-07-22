import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import audiobooks from "./data/audiobooks.js";
import User from "./models/user.js";
import Audiobook from "./models/audiobook.js";
import connectDB from "./config/db.js";

dotenv.config()
await connectDB()

const importData = async () => {
    try {
        await Audiobook.deleteMany()
        await User.deleteMany()

        const createdAudiobooks = await Audiobook.insertMany(audiobooks)
        console.log('Data Imported!'.green.inverse)
        process.exit()
    }
    catch (e) {
        console.log(`${e.message}`.red.inverse)
        process.exit(1)
    }
}

const DestroyData = async () => {
    try {
        await Audiobook.deleteMany()
        await User.deleteMany()


        console.log('Data Destroyed!'.green.inverse)
        process.exit()
    }
    catch (e) {
        console.log(`${e.message}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    DestroyData()
}
else {
    importData()
}