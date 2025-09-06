import { StatusCodes } from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { IsActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifiedToken } from "./jwt";
import { JwtPayload } from "jsonwebtoken";
import { envVar } from "../config/env";

export const createUserTokens = (user: Partial<IUser>)=>{
    const jwtPayload = {
            userId: user._id,
            email: user.email,
            role: user.role
        }
        const accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_KEY, envVar.JWT_EXPIRES_IN);
        const refreshToken = generateToken(jwtPayload, envVar.JWT_REFRESH_SECRET, envVar.JWT_REFRESH_EXPIRES);

        return {
            accessToken,
            refreshToken
        }
}

export const createTokens = async(refreshToken: string) =>{
    const verifyRefreshToken = verifiedToken(refreshToken, envVar.JWT_REFRESH_SECRET) as JwtPayload;

    const isUserExits = await User.findOne({ email: verifyRefreshToken.email });

    if(!isUserExits){
        throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
    }
    if(isUserExits.isActive === IsActive.BLOCKED || isUserExits.isActive === IsActive.INACTIVE){
        throw new AppError(StatusCodes.NOT_FOUND, `User is ${isUserExits.isActive}`);
    }
    if(isUserExits.isDeleted){
        throw new AppError(StatusCodes.NOT_FOUND, "User is Deleted");
    }

    const jwtPayload = {
        userId: isUserExits._id,
        email: isUserExits.email,
        role: isUserExits.role
    }
    const accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_KEY, envVar.JWT_EXPIRES_IN);

    return {
        accessToken
    }
}