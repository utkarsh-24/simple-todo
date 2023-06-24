import winston from "winston";
import path from "path"
import fs from "fs";
const createProductionLogger = (): winston.Logger => {
    const devLogDir: string = path.join(__dirname, "../logs")
    if (!fs.existsSync(devLogDir)) {
        fs.mkdirSync(devLogDir)
    }
    const { combine, timestamp, printf } = winston.format
    const customFormat: winston.Logform.Format = printf(({ timestamp, level, message }): string => {
        return `${timestamp} [${level}] ${message}`;
    })
    return winston.createLogger({
        level: "info",
        format: combine(timestamp(), customFormat),
        transports: [
            new winston.transports.File({ filename: path.join(devLogDir, "info.log") }),
            new winston.transports.File({ filename: path.join(devLogDir, "error.log"), level: "error" }),
        ]
    })
}

export { createProductionLogger }