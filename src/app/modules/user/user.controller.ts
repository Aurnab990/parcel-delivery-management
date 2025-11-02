import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { success } from "zod";


const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
 
    const user = await userService.createUser(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User created Succesfully",
            data: user
        }) 
});

const updateUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const userId = req.params.id;
    const payload = req.body;
    const verifiedToken = req.user as JwtPayload;
    const user = await userService.updateUser(userId, payload, verifiedToken);

    res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "User updated Succesfully",
            data: user
        });
});
const updateUserRole = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const userId = req.params.id;
    const role = req.body;
    const verifiedToken = req.user as JwtPayload;
    if(verifiedToken.role !== "SUPER_ADMIN"){
        throw new AppError(StatusCodes.FORBIDDEN, "Warning !! you are not allowed");
    }
    const user = await userService.updateUser(userId, role , verifiedToken);
    res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "User updated Succesfully",
            data: user
        });

});

const deleteUser = catchAsync(
  async(req: Request, res: Response, NextFunction) => {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "User deleted successfully",
    })
  }
);

const getSingleUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const id = req.params.id;
    const result = await userService.getSingleUser(id);

    if(!result){
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "User not found",
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Data retrieved successfully",
        data: result.data
    })
})

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
    getSingleUser,
    updateUser,
    updateUserRole,
    deleteUser
}