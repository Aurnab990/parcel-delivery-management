
export enum Role{
    ADMIN = "ADMIN",
    USER = "USER",
    RECIEVER = "RECIEVER"
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