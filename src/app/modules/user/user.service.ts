import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import { envVar } from "../../../config/env";

const createUser = async(payload: Partial<IUser>) =>{
    const { email, password, ...rest} = payload;
    const isUserExits = await User.findOne( {email} );

    if(isUserExits){
        throw new AppError(StatusCodes.BAD_REQUEST,"User already exits");
    }

    const hashPassword = await bcrypt.hash(password as string, Number(envVar.BECRYPT_SALT_ROUND));
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

const updateUser = async(payload: Partial<IUser>) =>{
    
}

const getAllUsers = async() =>{
    const users = await User.find({});
    const totalUsers = await User.countDocuments();
    return {
        data: users,
        meta: {
            totalUsers,
        }
    }
}




export const userService = {
    createUser,
    getAllUsers,
}