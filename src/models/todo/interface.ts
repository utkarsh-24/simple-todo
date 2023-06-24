import { Document } from "mongoose";
export interface ITodo extends Document {
    "name": string,
    "start_day": string,
    "end_day": string
}