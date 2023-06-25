import fs from "fs"
import path from "path"
import dotenv from "dotenv"

const NODE_ENV = process.env.NODE_ENV ?? "development";

const setupEnv = (): void => {
    const envDir = path.join(__dirname, "./config/" + NODE_ENV + ".env");
    if (fs.existsSync(envDir)) {
        dotenv.config({ path: envDir });
    } else {
        dotenv.config();
    }
}

setupEnv();

const PORT = process.env.PORT ?? "8080"



export { PORT, NODE_ENV }
