import { StatusCodes } from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { IUser } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model";
import bcrypt from "bcrypt";


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

    // const { password, ...rest } = isUserExits
    return {
        email: isUserExits.email
    }
}

export const authServices = {
    credentialsLogin
}