"use strict";
import { Router } from "express";
import todo from "../controllers/todo"

const router = Router()

router.post("/", todo.create)
router.get("/", todo.get)
router.put("/:id", todo.update)
router.delete("/:id", todo.remove)

export default router;