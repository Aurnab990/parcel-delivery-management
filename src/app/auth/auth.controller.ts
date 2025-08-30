import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.service";



const credentialLogin = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    
    const loginInfo = await authServices.credentialsLogin(req.body);

    res.cookie("refreshToken", loginInfo.refreshToken, {
        httpOnly: true,
        secure: false
    });
        res.status(StatusCodes.OK).json({
            success: true,
            message: "User Login Succesfully",
            data: loginInfo
        });
});

const getAccessToken = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = await authServices.getNewAccessToken(refreshToken);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "User Login Succesfully",
            data: tokenInfo
        });
});

export const authControllers = {
    credentialLogin,
    getAccessToken
}
