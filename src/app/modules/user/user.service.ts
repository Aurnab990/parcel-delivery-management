import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async(playload: Partial<IUser>) =>{
    const {name, email} = playload;
    const user = await User.create({name,email});
    return user;
}

export const userService = {
    createUser
}