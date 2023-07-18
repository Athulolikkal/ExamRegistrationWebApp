import mongoose from "mongoose";
const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    dateAndTime: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})
const model = mongoose.model('Registeration', registrationSchema)
export default model