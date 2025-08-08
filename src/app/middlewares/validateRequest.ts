import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

type AnyZodObject = ZodObject<any>;

export const validateRequest =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await zodSchema.parseAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
  };