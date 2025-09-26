import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { verifiedToken } from "../utils/jwt";
import { envVar } from "../config/env";

export const checkAuth =(...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  
    try {
      const accessToken = req.headers.authorization;
      if(!accessToken){
        throw new AppError(StatusCodes.UNAUTHORIZED,"Token not found")
      }
      const verifyToken = verifiedToken(accessToken, envVar.JWT_ACCESS_KEY) as JwtPayload;

      if(!authRoles.includes(verifyToken.role)){
        throw new AppError(StatusCodes.UNAUTHORIZED,"You are not allowed to this route");
      }
      req.user = verifyToken
      next();
    } catch (error) {
        console.log(error);
    }
  }
