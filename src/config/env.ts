import dotenv from "dotenv";

dotenv.config();

// interface envTypes{
//     PORT: string,
//     DB_URL: string,
//     NODE_DEV: "development" | "production"
// }

const loadEnv = {
    port: process.env.PORT as string,
    db_url: process.env.DB_URL as string,
    node: process.env.NODE as string
}

export const envVar = loadEnv

