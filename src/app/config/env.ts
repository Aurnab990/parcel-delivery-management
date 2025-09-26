import dotenv from "dotenv";

dotenv.config();


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
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    NODE_ENV: process.env.NODE_ENV as string

}

export const envVar = loadEnv

