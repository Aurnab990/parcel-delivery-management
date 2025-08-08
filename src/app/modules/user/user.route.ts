import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import z from "zod";

const router = Router();

router.post("/auth/register", userController.createUser);


export const userRoutes = router;