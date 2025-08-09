import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.service";

const credentialLogin = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const loginInfo = await authServices.credentialsLogin(req.body);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "User Login Succesfully",
            data: loginInfo
        }) 
})

export const authControllers = {
    credentialLogin,
}