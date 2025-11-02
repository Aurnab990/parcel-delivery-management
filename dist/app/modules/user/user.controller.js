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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userService.createUser(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        message: "User created Succesfully",
        data: user
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const payload = req.body;
    const verifiedToken = req.user;
    const user = yield user_service_1.userService.updateUser(userId, payload, verifiedToken);
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        success: true,
        message: "User updated Succesfully",
        data: user
    });
}));
const updateUserRole = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const role = req.body;
    const verifiedToken = req.user;
    if (verifiedToken.role !== "SUPER_ADMIN") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Warning !! you are not allowed");
    }
    const user = yield user_service_1.userService.updateUser(userId, role, verifiedToken);
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        success: true,
        message: "User updated Succesfully",
        data: user
    });
}));
const deleteUser = (0, catchAsync_1.catchAsync)((req, res, NextFunction) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userService.deleteUser(id);
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        success: true,
        message: "User deleted successfully",
    });
}));
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.userService.getSingleUser(id);
    if (!result) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: "User not found",
        });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Data retrieved successfully",
        data: result.data
    });
}));
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUsers();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Data retrieved successfully",
        data: result.data,
        meta: result.meta
    });
}));
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUserRole,
    deleteUser
};
