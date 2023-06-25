import mongoose, { Schema } from "mongoose";
import { ITodo } from "./interface";
import { TodoStatus } from "./enum";

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: TodoStatus
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<ITodo>("todo", TodoSchema);

