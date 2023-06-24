import mongoose, { Schema } from "mongoose";
import { ITodo } from "./interface";
import { TodoDay } from "./enum";

const TodoSchema = new Schema({
    name: {
        "type": "string",
        required: true
    },
    start_day: {
        type: "string",
        required: true,
        enum:TodoDay
    },
    end_day: {
        type: "string",
        required: true,
        enum:TodoDay
    }
})

export default mongoose.model<ITodo>("todo", TodoSchema);

