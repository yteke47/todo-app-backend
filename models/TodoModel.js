import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    isMarked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: 'Todo',
    versionKey: false
});

export default mongoose.model("Todo", todoSchema)