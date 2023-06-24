import { Request, Response, NextFunction } from "express";
import { createTodo } from "../service/todo/todo";
import joi from "joi"
const get = async (req: Request, res: Response, next: NextFunction) => {
    const todoSchema = joi.object({
        name: joi.string().required()
    })
    try {
        // return res.send(todoSchema.validate(req.body).error)
        return res.send(await createTodo(req.body));
    } catch (err) {
        next(err);
    }
}

export default { get }