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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
// import { verifiedToken } from "../../utils/jwt";
// import { envVar } from "../../../config/env";
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userService.createUser(req.body);
    // console.log(user);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        message: "User created Succesfully",
        data: user
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifyToken = verifiedToken(token as string, envVar.JWT_ACCESS_KEY);
    const payload = req.body;
    const verifiedToken = req.user;
    const user = yield user_service_1.userService.updateUser(userId, payload, verifiedToken);
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        success: true,
        message: "User updated Succesfully",
        data: user
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
    updateUser,
};
