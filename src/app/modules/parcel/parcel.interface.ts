import { Date, Document, Types } from "mongoose";

export enum Parcelstatus {
    PENDING = "PENDING",
    IN_TRANSIT = "IN-TRANSIT",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED"
}

export interface IParcel extends Document{
    itemName: string,
    trackingId: string,
    sender: Types.ObjectId,
    receiver: Types.ObjectId,
    pickupAddress: string,
    deliveryAddress: string,
    price: number,
    status?: Parcelstatus,
    createdAt: Date,
    updatedAt: Date
    
}