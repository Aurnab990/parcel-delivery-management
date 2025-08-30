import { StatusCodes } from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { IsActive, IUser } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateToken, verifiedToken } from "../utils/jwt";
import { envVar } from "../../config/env";
import { createUserTokens } from "../utils/userToken";


const credentialsLogin = async(playload: Partial<IUser>) =>{
    const {email, password} = playload;
    const isUserExits = await User.findOne({email});
    if(!isUserExits){
        throw new AppError(StatusCodes.BAD_REQUEST,"User Not registered")
    }

    const isPasswordMatch = await bcrypt.compare(password as string, isUserExits.password as string);
    if(!isPasswordMatch){
        throw new AppError(StatusCodes.BAD_GATEWAY,"Password Incorrect");
    }

    // const jwtPayload = {
    //     userId: isUserExits._id,
    //     email: isUserExits.email,
    //     role: isUserExits.role
    // }
    // const accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_KEY, envVar.JWT_EXPIRES_IN);
    // const refreshToken = generateToken(jwtPayload, envVar.JWT_REFRESH_SECRET, envVar.JWT_REFRESH_EXPIRES);

    // delete isUserExits.password;

    // const accessToken = jwt.sign(jwtPlayload, "vAu@3$bUTy!21", {
    //     expiresIn: "1d"
    // })

    // const { password, ...rest } = isUserExits

    const userTokens = createUserTokens(isUserExits);
    return {
        // email: isUserExits.email
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: isUserExits
    }
}

const getNewAccessToken = async(refreshToken: string) =>{
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
    

    // delete isUserExits.password;

    // const accessToken = jwt.sign(jwtPlayload, "vAu@3$bUTy!21", {
    //     expiresIn: "1d"
    // })

    // const { password, ...rest } = isUserExits

    const userTokens = createUserTokens(isUserExits);
    return {
        // email: isUserExits.email
        accessToken
    }
}

export const authServices = {
    credentialsLogin,
    getNewAccessToken
    
}