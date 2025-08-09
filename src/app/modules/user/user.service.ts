import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const createUser = async(playload: Partial<IUser>) =>{
    const { email, password, ...rest} = playload;
    const isUserExits = await User.findOne( {email} );

    if(isUserExits){
        throw new AppError(StatusCodes.BAD_REQUEST,"User already exits");
    }

    const hashPassword = await bcrypt.hash(password as string, 10);
    // console.log(hashPassword);
    // const isPasswordMatch = await bcrypt.compare(password as string, hashPassword);
    // console.log(isPasswordMatch);

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string}

    const user = await User.create({
         email ,
         password: hashPassword,
        ...rest,
        authProvider: [authProvider]
    
    });

    return user;
}


export const userService = {
    createUser
}