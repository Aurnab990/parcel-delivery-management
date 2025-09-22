import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
// import { verifiedToken } from "../../utils/jwt";
// import { envVar } from "../../../config/env";



const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
 
    const user = await userService.createUser(req.body);
        // console.log(user);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User created Succesfully",
            data: user
        }) 
});

const updateUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifyToken = verifiedToken(token as string, envVar.JWT_ACCESS_KEY);
    const payload = req.body;
    const verifiedToken = req.user as JwtPayload;
    const user = await userService.updateUser(userId, payload, verifiedToken);

    res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "User updated Succesfully",
            data: user
        });
});

const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await userService.getAllUsers();
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Data retrieved successfully",
        data: result.data,
        meta: result.meta
    });
})

export const userController = {
    createUser,
    getAllUsers,
    updateUser,
}