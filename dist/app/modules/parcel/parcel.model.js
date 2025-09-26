"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parcel = void 0;
const mongoose_1 = require("mongoose");
const parcel_interface_1 = require("./parcel.interface");
const parcelSchema = new mongoose_1.Schema({
    itemName: { type: String, required: true, unique: false },
    trackingId: { type: String, required: true, unique: true },
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(parcel_interface_1.Parcelstatus),
        default: parcel_interface_1.Parcelstatus.PENDING,
    }
}, { timestamps: true, versionKey: false });
exports.Parcel = (0, mongoose_1.model)("Parcel", parcelSchema);
// (models.User as mongoose.Model<IParcel>) ||
