"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVar = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// interface envTypes{
//     PORT: string,
//     DB_URL: string,
//     NODE_DEV: "development" | "production"
// }
const loadEnv = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    node: process.env.NODE,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    BECRYPT_SALT_ROUND: process.env.BECRYPT_SALT_ROUND,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
    FRONTEND_URL: process.env.FRONTEND_URL
};
exports.envVar = loadEnv;
