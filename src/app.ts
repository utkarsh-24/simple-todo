import express, { Request, Response, NextFunction } from 'express'
import { PORT } from "./configure"
import { logger } from "./logger"
import mongoose from 'mongoose'
import { todoRouter } from './routes';
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import "express-async-errors"

const app = express()

process.on("uncaughtException", (ex) => {
    logger.error(ex);
})

process.on("unhandledRejection", (ex) => {
    logger.error(ex)
})


const setupDB = () => {
    const DB_URL = process.env.DB_URL ?? "";
    const DB_NAME = process.env.DB_NAME ?? "development";
    mongoose.connect(DB_URL, { dbName: DB_NAME })
        .then(() => {
            logger.info("Db connection established")
        })
        .catch((error) => {
            logger.error("Error connecting to database " + error);
            process.exit(0);
        })
}
setupDB();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests'
})
app.use(express.json())
app.use(limiter)
app.use(helmet())
app.use("/todo", todoRouter)


app.use((req, res) => {
    return res.status(404).send({ message: "Page not found" });
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err)
    console.log(err)
    return res.send({ "message": "something went wrong" })
})

// app.use("exceptionsHandler", () => {
//     console.log("exceptionsHandler")
// })

// app.use("promiseHandler", () => {
//     console.log("promiseHandler")
// })

app.listen(PORT, () => {
    console.log("server started " + PORT);
    logger.info("server started " + PORT);
})