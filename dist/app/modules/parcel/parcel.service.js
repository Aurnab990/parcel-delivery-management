"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelService = void 0;
const parcel_model_1 = require("./parcel.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../user/user.model");
const createParcel = (payload, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemName, sender, receiverEmail } = payload, rest = __rest(payload, ["itemName", "sender", "receiverEmail"]);
    const receiver = yield user_model_1.User.findOne({ email: receiverEmail });
    if (!receiver) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, `Receiver email ${receiverEmail} account not found!`);
    }
    const trackingId = "TRK" + Date.now();
    const parcel = yield parcel_model_1.Parcel.create(Object.assign({ itemName,
        trackingId, sender: senderId, receiver: receiver._id }, rest));
    return parcel;
});
const getAllParcel = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find(query)
        .populate("sender", "name email")
        .populate("receiver", "name email")
        .sort({ createdAt: -1 });
    const totalParcel = yield parcel_model_1.Parcel.countDocuments(query);
    return {
        data: parcels,
        meta: {
            totalParcel
        }
    };
});
// ADMIN AND SUPERADMIN CAN UPDATE
const updateParcel = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitsParcel = yield parcel_model_1.Parcel.findById(id);
    if (!exitsParcel) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Parcel not found");
    }
    const updateParcel = yield parcel_model_1.Parcel.findByIdAndUpdate(id, payload, { new: true });
    return updateParcel;
});
// RECEIVER CAN UPDATE STATUS
const upadateReceiverStatus = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitsParcel = yield parcel_model_1.Parcel.findById(id);
    if (!exitsParcel) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Parcel not found");
    }
    if (exitsParcel.receiver._id.toString() !== user.userId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Sorry! Sender can't update");
    }
    const updateParcel = yield parcel_model_1.Parcel.findByIdAndUpdate(id, payload, { new: true });
    return updateParcel;
});
const getParcelByTrackingId = (trackingId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findOne({ trackingId })
        .populate("sender", "name email")
        .populate("receiver", "name email");
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "No parcel with this Tracking ID");
    }
    return parcel;
});
const deleteParcel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findByIdAndDelete(id);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Parcel Not Found");
    }
    return null;
});
exports.parcelService = {
    createParcel,
    getAllParcel,
    deleteParcel,
    updateParcel,
    upadateReceiverStatus,
    getParcelByTrackingId
};
