"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ message: "Name must be string" })
        .min(4, { message: "Name must be at least 4 characters" })
        .max(20, { message: "Name can not exceed 20 characters" }).optional(),
    email: zod_1.default.string().min(1, { message: "Email is required" }),
    password: zod_1.default
        .string({ message: "Password must be string" })
        .min(6, { message: "Password must be at least 6 characters" })
        .regex(/[A-Z]/, {
        message: "Password must contain an uppercase letter",
    })
        .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain a number" })
        .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain a special character",
    }).optional(),
    phone: zod_1.default
        .string()
        .min(11, { message: "Phone must be at least 11 digits" }).optional(),
    picture: zod_1.default.string().optional(),
    address: zod_1.default
        .string({ message: "Address must be string" })
        .min(5, { message: "Address must be at least 5 characters" }),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ message: "Name must be string" })
        .min(4, { message: "Name must be at least 4 characters" })
        .max(20, { message: "Name can not exceed 20 characters" })
        .optional(),
    email: zod_1.default.string().min(1, { message: "Email is required" }).optional(),
    password: zod_1.default
        .string({ message: "Password must be string" })
        .min(6, { message: "Password must be at least 6 characters" })
        .regex(/[A-Z]/, {
        message: "Password must contain an uppercase letter",
    })
        .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain a number" })
        .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain a special character",
    })
        .optional(),
    phone: zod_1.default
        .string({ message: "Phone must be string" })
        .min(10, { message: "Phone must be at least 10 digits" })
        .optional(),
    picture: zod_1.default.string().optional().optional(),
    address: zod_1.default
        .string({ message: "Address must be string" })
        .min(5, { message: "Address must be at least 5 characters" })
        .optional(),
    isVerified: zod_1.default.boolean().optional(),
    isDeleted: zod_1.default.boolean().optional(),
    isActive: zod_1.default
        .enum([user_interface_1.IsActive.ACTIVE, user_interface_1.IsActive.INACTIVE])
        .optional()
        .default(user_interface_1.IsActive.ACTIVE)
        .optional(),
    role: zod_1.default
        .enum([user_interface_1.Role.USER, user_interface_1.Role.ADMIN, user_interface_1.Role.RECEIVER])
        .optional()
        .default(user_interface_1.Role.USER)
        .optional(),
});
