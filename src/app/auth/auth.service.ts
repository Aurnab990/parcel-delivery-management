import { StatusCodes } from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { IUser } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt";
import { envVar } from "../../config/env";


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

    const jwtPayload = {
        userId: isUserExits._id,
        email: isUserExits.email,
        role: isUserExits.role
    }
    const accessToken = generateToken(jwtPayload, envVar.JWT_ACCESS_KEY, envVar.JWT_EXPIRES_IN);
    

    // const accessToken = jwt.sign(jwtPlayload, "vAu@3$bUTy!21", {
    //     expiresIn: "1d"
    // })

    // const { password, ...rest } = isUserExits
    return {
        // email: isUserExits.email
        accessToken
    }
}

export const authServices = {
    credentialsLogin
}