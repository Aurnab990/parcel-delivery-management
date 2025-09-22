"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorhandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const globalErrorhandler = (err, req, res, next) => {
    let statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let message = `Something went wrong: ${err}`;
    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: err.stack
    });
};
exports.globalErrorhandler = globalErrorhandler;
