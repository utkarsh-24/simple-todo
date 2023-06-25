import Joi from "joi";
import { TodoStatus } from "../models/todo";

const todoCreateValidator = Joi.object({
    name: Joi.string().min(10).max(100).alphanum().required(),
    status: Joi.string().valid(...Object.values(TodoStatus)),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
})


const todoUpdateValidator = Joi.object({
    name: Joi.string().min(10).max(100).alphanum(),
    status: Joi.string().valid(...Object.values(TodoStatus)),
    start_date: Joi.date(),
    end_date: Joi.date(),
})

export { todoCreateValidator, todoUpdateValidator }