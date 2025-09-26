import { StatusCodes } from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { IUser } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model";
import bcrypt from "bcrypt";
import { createTokens, createUserTokens } from "../utils/userToken";


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

    const userTokens = createUserTokens(isUserExits);
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: isUserExits
    }
}

const getNewAccessToken = async(refreshToken: string) =>{
    const newAccessTokens = await createTokens(refreshToken);

    return {
        accessToken: newAccessTokens
    }
}

export const authServices = {
    credentialsLogin,
    getNewAccessToken
    
}
