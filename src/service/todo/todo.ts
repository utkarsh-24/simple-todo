/**
 * 1.create todo
 * 2.get todo using filter
 * 3.get all todos
 * 4.update to
 * 5.delete todo
 */
"use strict";

import ErrorHandler from "../../middlewares/errorhandler";
import { ITodo } from "../../models/todo";
import { Todo } from "../../models/todo";
import { ObjectId } from "bson";


const create = async (todoRequest: ITodo) => {
    const { name } = todoRequest;
    let todo = await Todo.findOne({ name });
    if (todo) {
        throw new ErrorHandler("user already exist", 409)
    }
    todo = new Todo(todoRequest)
    await todo.validate()
    const result = await todo.save();
    return { success: true, message: "user created successfully" };
}

const get = async (filter: Object) => {
    let todos = undefined;
    if (Object.keys(filter).length) {
        todos = await Todo.findOne(filter);
    } else {
        todos = await Todo.find();
    }
    if (todos) {
        return { success: true, todos: todos };
    }
    return { success: false, todos: [] }
}

const update = async (id: string, body: Partial<ITodo>) => {
    let updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(id, { ...body }, { next: true });
    if (!updatedTodo) {
        throw new ErrorHandler("Todo not found", 404)
    }
    return { success: true, message: "todo updated successflly", data: updatedTodo }
}

const remove = async (id: string) => {
    let todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
        throw new ErrorHandler("Todo not found", 404)
    }
    return { success: true, message: "Todo deleted successfully" }
}

export { create, get, update, remove }