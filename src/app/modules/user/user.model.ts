import mongoose, { model, models, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";


const authSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
},{
    versionKey: false,
    _id: false
})

const userSchema = new Schema<IUser> ({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isVerified:{ type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isActive: { 
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE
    },
    role: {
        type: String, 
        enum: Object.values(Role), 
        default: Role.USER
    },
    auth: [authSchema]
    
}, {timestamps: true, versionKey: false});

export const User = (models.User as mongoose.Model<IUser>) || model<IUser>("User", userSchema);