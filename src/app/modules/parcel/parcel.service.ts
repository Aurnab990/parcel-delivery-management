import { Request, Response } from "express";
import { IParcel, Parcelstatus } from "./parcel.interface";
import { Parcel } from "./parcel.model";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import { userController } from "../user/user.controller";

const createParcel = async(payload: any, senderId: string) =>{
    const { itemName, sender, receiverEmail, ...rest} = payload;
    const receiver = await User.findOne({email: receiverEmail});
    if(!receiver){
        throw new AppError(StatusCodes.NOT_FOUND,`Receiver email ${receiverEmail} account not found!`);
    }
    const trackingId = "TRK" + Date.now();
    const parcel = await Parcel.create({
        itemName,
        trackingId,
        sender: senderId,
        receiver: receiver._id,
        ...rest
    });
    return parcel;
}

const getAllParcel = async(query: Record <string, string>) =>{
    const parcels = await Parcel.find(query)
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .sort({ createdAt: -1 });
    const totalParcel = await Parcel.countDocuments(query);
    return {
        data: parcels,
        meta: {
            totalParcel
        }
    }
}

// ADMIN AND SUPERADMIN CAN UPDATE
const updateParcel = async(id: string, payload: Partial<IParcel>) =>{
    const exitsParcel = await Parcel.findById(id);
    if(!exitsParcel){
        throw new AppError(StatusCodes.NOT_FOUND,"Parcel not found");
    }
    const updateParcel = await Parcel.findByIdAndUpdate(id, payload, { new: true });
    return updateParcel;
}

// RECEIVER CAN UPDATE STATUS
const upadateReceiverStatus = async(id: string,user: JwtPayload, status: string)=>{
    const exitsParcel = await Parcel.findById(id);
    
    if(!exitsParcel){
        throw new AppError(StatusCodes.NOT_FOUND,"Parcel not found");
    }
    if(exitsParcel.receiver._id.toString() !== user.userId){
        throw new AppError(StatusCodes.FORBIDDEN,"Sorry! Sender can't update");
    }
    const updateParcel = await Parcel.findByIdAndUpdate(id, { status }, { new: true });
    return updateParcel;
    
}

const getParcelByTrackingId = async(trackingId: string) =>{
    const parcel = await Parcel.findOne({ trackingId })
    .populate("sender", "name email")
    .populate("receiver", "name email")

    if(!parcel){
        throw new AppError(StatusCodes.NOT_FOUND,"No parcel with this Tracking ID");
    }
    return parcel;

}

const deleteParcel = async(id: string) =>{

    const parcel = await Parcel.findByIdAndDelete(id);
    if(!parcel){
        throw new AppError(StatusCodes.NOT_FOUND,"Parcel Not Found");
    }
    return null;
}

export const parcelService = {
    createParcel,
    getAllParcel,
    deleteParcel,
    updateParcel,
    upadateReceiverStatus,
    getParcelByTrackingId
}