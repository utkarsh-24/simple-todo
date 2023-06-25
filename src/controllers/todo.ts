import { Request, Response, NextFunction } from "express";
import { create as createTodo, get as getTodo, update as updateTodo, remove as removeTodo } from "../service/todo/todo";
import { todoCreateValidator, todoUpdateValidator } from "../validations/todo";
import ErrorHandler from "../middlewares/errorhandler";

const create = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await todoCreateValidator.validate(req.body)
    if (validate.error) {
        next(new ErrorHandler(validate.error.details[0].message, 400))
    } else {
        try {
            return res.send(await createTodo(req.body));
        } catch (err: any) {
            next(new ErrorHandler(err.message, err.statusCode ?? 400));
        }
    }

}

const get = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    try {
        return res.send(await getTodo(query))
    } catch (err: any) {
        next(new ErrorHandler(err.message, err.statusCode ?? 500))
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const id = req.params.id;
    const isValid = await todoUpdateValidator.validate(body);
    if (isValid.error) {
        next(new ErrorHandler(isValid.error.details[0].message, 400))
    }
    else {
        return res.send(await updateTodo(id, body));
    }
    return res.send(isValid)
}


const remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        return res.send(await removeTodo(id))
    } catch (err: any) {
        next(new ErrorHandler(err.message, err.statusCode ?? 500))
    }
}

export default { create, get, update, remove }