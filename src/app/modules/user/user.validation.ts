import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(4, { message: "Name must be at least 4 characters" })
    .max(20, { message: "Name can not exceed 20 characters" }).optional(),

  email: z.string().min(1, { message: "Email is required" }),

  password: z
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

  phone: z
    .string()
    .min(11, { message: "Phone must be at least 11 digits" }).optional(),

  picture: z.string().optional(),

  address: z
    .string({ message: "Address must be string" })
    .min(5, { message: "Address must be at least 5 characters" }),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(4, { message: "Name must be at least 4 characters" })
    .max(20, { message: "Name can not exceed 20 characters" })
    .optional(),

  email: z.string().min(1, { message: "Email is required" }).optional(),

  password: z
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

  phone: z
    .string({ message: "Phone must be string" })
    .min(10, { message: "Phone must be at least 10 digits" })
    .optional(),

  picture: z.string().optional().optional(),

  address: z
    .string({ message: "Address must be string" })
    .min(5, { message: "Address must be at least 5 characters" })
    .optional(),

  isVerified: z.boolean().optional(),
  isDeleted: z.boolean().optional(),

  isActive: z
    .enum([IsActive.ACTIVE, IsActive.INACTIVE])
    .optional()
    .default(IsActive.ACTIVE)
    .optional(),

  role: z
    .enum([Role.USER, Role.ADMIN, Role.RECEIVER])
    .optional()
    .default(Role.USER)
    .optional(),
});
