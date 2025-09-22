"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCokies = void 0;
const setCokies = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: false
        });
        if (tokenInfo.refreshToken) {
            res.cookie("refreshToken", tokenInfo.refreshToken, {
                httpOnly: true,
                secure: false
            });
        }
    }
};
exports.setCokies = setCokies;
