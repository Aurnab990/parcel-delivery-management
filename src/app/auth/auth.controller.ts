import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.service";
import { setCokies } from "../utils/setCookies";
import { createUserTokens } from "../utils/userToken";
import AppError from "../errorHelpers/AppError";
import { envVar } from "../config/env";




const credentialLogin = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    
    const loginInfo = await authServices.credentialsLogin(req.body);

    setCokies(res, loginInfo);

        res.status(StatusCodes.OK).json({
            success: true,
            message: "User Login Succesfully",
            data: loginInfo
        });
});

const credentialLogout = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    
        res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

        res.status(StatusCodes.OK).json({
            success: true,
            message: "User Logout Succesfully",
            data: null
        });
});

const getAccessToken = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = await authServices.getNewAccessToken(refreshToken);

        res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: false
    });

        res.status(StatusCodes.OK).json({
            success: true,
            message: "User Login Succesfully",
            data: tokenInfo
        });
});

const googleCallBack = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    let state = req.query.state ? req.query.state as string : "";
    if(state.startsWith("/")){
        state = state.slice(1);

    }
    const user = req.user;
    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND,"User not found");
    }
    const tokenInfo = await createUserTokens(user);

    setCokies(res,tokenInfo);
    res.redirect(`${envVar.FRONTEND_URL}/redirect/${state}`);
})

export const authControllers = {
    credentialLogin,
    credentialLogout,
    getAccessToken,
    googleCallBack
}
