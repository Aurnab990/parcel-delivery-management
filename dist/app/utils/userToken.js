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
exports.createTokens = exports.createUserTokens = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const user_interface_1 = require("../modules/user/user.interface");
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("./jwt");
const env_1 = require("../config/env");
const createUserTokens = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVar.JWT_ACCESS_KEY, env_1.envVar.JWT_EXPIRES_IN);
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVar.JWT_REFRESH_SECRET, env_1.envVar.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken
    };
};
exports.createUserTokens = createUserTokens;
// refresh token created
const createTokens = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyRefreshToken = (0, jwt_1.verifiedToken)(refreshToken, env_1.envVar.JWT_REFRESH_SECRET);
    const isUserExits = yield user_model_1.User.findOne({ email: verifyRefreshToken.email });
    if (!isUserExits) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User Not Found");
    }
    if (isUserExits.isActive === user_interface_1.IsActive.BLOCKED || isUserExits.isActive === user_interface_1.IsActive.INACTIVE) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, `User is ${isUserExits.isActive}`);
    }
    if (isUserExits.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User is Deleted");
    }
    const jwtPayload = {
        userId: isUserExits._id,
        email: isUserExits.email,
        role: isUserExits.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVar.JWT_ACCESS_KEY, env_1.envVar.JWT_EXPIRES_IN);
    return {
        accessToken
    };
});
exports.createTokens = createTokens;
