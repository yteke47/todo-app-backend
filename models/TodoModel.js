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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, {
    collection: 'Todo',
    versionKey: false,
    timestamps: true,
});

export default mongoose.model("Todo", todoSchema)