import { Types } from "mongoose"

export enum Role{
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    RECEIVER = "RECEIVER"
}
export interface IAuthProvider {
    provider: string,
    providerId: string
}
export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
    _id?: Types.ObjectId,
    name: string,
    email: string,
    password?: string,
    phone?: string,
    picture?: string,
    address?: string,
    isVerified?: boolean,
    isDeleted?: boolean,
    isActive?: IsActive,
    role: Role,
    auth: IAuthProvider[],
    parcel?: string,
}