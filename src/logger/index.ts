import winston from "winston";
import { createDevelopmentLogger } from "./developmentLogger";
import { createProductionLogger } from "./productionLogger";
const createLogger = (): winston.Logger => {
    if (process.env.NODE_ENV === 'production') {
        console.log("Production Logger");
        return createProductionLogger()
    }
    return createDevelopmentLogger()
}
const logger = createLogger();
export { logger }