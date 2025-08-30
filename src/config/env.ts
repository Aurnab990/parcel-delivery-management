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
    node: process.env.NODE as string,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    BECRYPT_SALT_ROUND: process.env.BECRYPT_SALT_ROUND as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string

}

export const envVar = loadEnv

