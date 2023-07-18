import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,

    },
    dateAndTime: {
        type: [String],
    },
})
const model = mongoose.model('Subject', subjectSchema)
export default model