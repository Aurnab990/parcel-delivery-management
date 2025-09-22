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
exports.authControllers = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const http_status_codes_1 = require("http-status-codes");
const auth_service_1 = require("./auth.service");
const setCookies_1 = require("../utils/setCookies");
const userToken_1 = require("../utils/userToken");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const env_1 = require("../config/env");
const credentialLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = yield auth_service_1.authServices.credentialsLogin(req.body);
    (0, setCookies_1.setCokies)(res, loginInfo);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "User Login Succesfully",
        data: loginInfo
    });
}));
const credentialLogout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "User Logout Succesfully",
        data: null
    });
}));
const getAccessToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = yield auth_service_1.authServices.getNewAccessToken(refreshToken);
    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: false
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "User Login Succesfully",
        data: tokenInfo
    });
}));
const googleCallBack = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let state = req.query.state ? req.query.state : "";
    if (state.startsWith("/")) {
        state = state.slice(1);
    }
    const user = req.user;
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    const tokenInfo = yield (0, userToken_1.createUserTokens)(user);
    (0, setCookies_1.setCokies)(res, tokenInfo);
    res.redirect(`${env_1.envVar.FRONTEND_URL}/redirect/${state}`);
}));
exports.authControllers = {
    credentialLogin,
    credentialLogout,
    getAccessToken,
    googleCallBack
};
