import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATA_BASE)
        console.log('----------MONGODB--CONNECTED----------');
    } catch (err) {
        console.log(err, ':error on connecting database');
    }
}

export default connectDB