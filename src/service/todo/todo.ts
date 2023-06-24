"use strict";

import { ITodo } from "../../models/todo";
import { Todo } from "../../models/todo";
const createTodo = async (todoRequest: ITodo) => {
    const todo = new Todo(todoRequest)
    await todo.validate()
    const result = await todo.save();
    return result;
}

export { createTodo }