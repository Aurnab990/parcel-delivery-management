import { model, Schema, Types } from "mongoose";
import { IParcel, Parcelstatus } from "./parcel.interface";


const parcelSchema = new Schema<IParcel>({
    itemName: { type: String, required: true, unique: false},
    trackingId: { type: String, required: true, unique: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    price: { type: Number, required: true },
    status: { 
        type: String, 
        enum: Object.values(Parcelstatus), 
        default: Parcelstatus.PENDING,
    }
    
},{ timestamps: true , versionKey: false });

export const Parcel = model<IParcel>("Parcel", parcelSchema);