import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { envVar } from "../../config/env";

const createUser = async(payload: Partial<IUser>) =>{
    const { email, password, ...rest} = payload;
    const isUserExits = await User.findOne( {email} );

    if(isUserExits){
        throw new AppError(StatusCodes.BAD_REQUEST,"User already exits");
    }

    const hashPassword = await bcrypt.hash(password as string, Number(envVar.BECRYPT_SALT_ROUND));

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string}

    const user = await User.create({
         email ,
         password: hashPassword,
        ...rest,
        authProvider: [authProvider]
    
    });

    return user;
}

const updateUser = async(userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) =>{
    const ifUserExits = await User.findById(userId);
    if(!ifUserExits){
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }
    if(payload.role){
        if(payload.role === Role.USER){
        throw new AppError(StatusCodes.FORBIDDEN, "Your are not authorized");
       }
       if(payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN){
        throw new AppError(StatusCodes.FORBIDDEN, "Your are not authorized");
       }
    }

    if(payload.password){
        payload.password = await bcrypt.hash(payload.password, envVar.BECRYPT_SALT_ROUND);
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });

    return newUpdatedUser;
}

const updateUserRole = async(id: string, role: string) => {
    const exitsUser = await User.findById(id);
    if(!exitsUser){
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }
    const updateUser = await User.findByIdAndUpdate(id, { role }, {new: true});
    return updateUser;

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

const deleteUser = async(id: string) =>{
    const user = await User.findByIdAndDelete(id);
    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND,"User not found");
    }
    return null;

}



export const userService = {
    createUser,
    getAllUsers,
    updateUser,
    updateUserRole,
    deleteUser
}