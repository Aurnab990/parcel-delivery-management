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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const parcel_service_1 = require("./parcel.service");
const http_status_codes_1 = require("http-status-codes");
const parcel_model_1 = require("./parcel.model");
const mongoose_1 = require("mongoose");
const createParcel = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const parcel = yield parcel_service_1.parcelService.createParcel(req.body, user.userId);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        message: "Parcel created successfully",
        data: parcel
    });
}));
const getRecieverParcel = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find(query)
        .populate("sender", "name email")
        .populate("receiver", "name email");
    const totalParcel = yield parcel_model_1.Parcel.countDocuments(query);
    return {
        data: parcels,
        meta: { totalParcel },
    };
});
const getAllParcel = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    let query = {};
    if (user.role === "USER") {
        query.$or = [
            { sender: new mongoose_1.Types.ObjectId(user.userId) },
            { receiver: new mongoose_1.Types.ObjectId(user.userId) }
        ];
    }
    else if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
        if (req.query.status) {
            query.status = req.query.status;
        }
    }
    const result = yield parcel_service_1.parcelService.getAllParcel(query);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Data retrieved successfully",
        data: result.data,
        meta: result.meta
    });
}));
const updateParcel = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    const updatedItem = yield parcel_service_1.parcelService.updateParcel(id, payload);
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        success: true,
        message: "Parcel updated successfully",
        data: updatedItem
    });
}));
const upadateReceiverStatus = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.body;
    const updatedItem = yield parcel_service_1.parcelService.updateParcel(id, status);
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        success: true,
        message: "Parcel updated successfully",
        data: updatedItem
    });
}));
const deleteParcel = (0, catchAsync_1.catchAsync)((req, res, NextFunction) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield parcel_service_1.parcelService.deleteParcel(id);
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        success: true,
        message: "Parcel deleted successfully",
    });
}));
const getParcelByTrackingId = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { trackingId } = req.params;
    const result = yield parcel_service_1.parcelService.getParcelByTrackingId(trackingId);
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        success: true,
        message: "Parcel found by tracking ID",
        data: result
    });
}));
exports.parcelController = {
    createParcel,
    getAllParcel,
    getRecieverParcel,
    updateParcel,
    deleteParcel,
    upadateReceiverStatus,
    getParcelByTrackingId
};
