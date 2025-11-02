"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCokies = void 0;
const setCokies = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        if (tokenInfo.refreshToken) {
            res.cookie("refreshToken", tokenInfo.refreshToken, {
                secure: true,
                sameSite: "none"
            });
        }
    }
};
exports.setCokies = setCokies;
