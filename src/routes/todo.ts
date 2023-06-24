"use strict";
import { Router } from "express";
import todo from "../controllers/todo"

const router = Router()

router.post("/", todo.get)

router.get("/", (req, res) => {

    res.send("still working")
})

export default router;