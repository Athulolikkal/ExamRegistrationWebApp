import mongoose from "mongoose";
const stateSchema = new mongoose.Schema({
    stateName: {
        type: String,
    },
    city: {
        type: [String]
    }
})
const model = mongoose.model('State', stateSchema)
export default model