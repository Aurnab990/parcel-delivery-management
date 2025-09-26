"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCokies = void 0;
const env_1 = require("../config/env");
const setCokies = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: env_1.envVar.NODE_ENV === "production",
            sameSite: "none"
        });
        if (tokenInfo.refreshToken) {
            res.cookie("refreshToken", tokenInfo.refreshToken, {
                secure: env_1.envVar.NODE_ENV === "production",
                sameSite: "none"
            });
        }
    }
};
exports.setCokies = setCokies;
