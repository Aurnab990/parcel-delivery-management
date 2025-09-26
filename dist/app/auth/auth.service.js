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
exports.authServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const user_model_1 = require("../modules/user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userToken_1 = require("../utils/userToken");
const credentialsLogin = (playload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = playload;
    const isUserExits = yield user_model_1.User.findOne({ email });
    if (!isUserExits) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User Not registered");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, isUserExits.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, "Password Incorrect");
    }
    const userTokens = (0, userToken_1.createUserTokens)(isUserExits);
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: isUserExits
    };
});
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccessTokens = yield (0, userToken_1.createTokens)(refreshToken);
    return {
        accessToken: newAccessTokens
    };
});
exports.authServices = {
    credentialsLogin,
    getNewAccessToken
};
