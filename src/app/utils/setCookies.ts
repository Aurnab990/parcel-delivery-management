import { Response } from "express";
import { envVar } from "../config/env";

interface authTokens {
    accessToken?: string,
    refreshToken?: string
}
export const setCokies = (res: Response, tokenInfo: authTokens) =>{
    if(tokenInfo.accessToken){
        res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"

    });
    if(tokenInfo.refreshToken){
        res.cookie("refreshToken", tokenInfo.refreshToken, {
        secure: true,
        sameSite: "none"
    });
    }
    }
}