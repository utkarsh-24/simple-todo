import { Document } from "mongoose";
export interface ITodo extends Document {
    "name": string,
    "start_date": Date,
    "end_date": Date,
    "status": String,
    "created_date": Date
}