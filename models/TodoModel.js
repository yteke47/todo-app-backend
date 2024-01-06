import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value === null || value >= new Date();
            },
            message: 'Due date should be in the future or null.',
        },
    },
    isMarked: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, {
    collection: 'Todo',
    versionKey: false,
    timestamps: true
});

export default model("Todo", todoSchema)