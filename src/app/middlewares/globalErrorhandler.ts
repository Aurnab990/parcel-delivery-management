import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const globalErrorhandler = (err: any, req: Request, res: Response, next: NextFunction) =>{
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = `Something went wrong: ${err}`;
    
    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: err.stack
    });
}