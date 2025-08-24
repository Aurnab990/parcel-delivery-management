import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";



const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
 
    const user = await userService.createUser(req.body);
        // console.log(user);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User created Succesfully",
            data: user
        }) 
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
}