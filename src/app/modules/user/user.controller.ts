import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { StatusCodes } from "http-status-codes";


const createUser = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const user = await userService.createUser(req.body);
        // console.log(user);
        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "User created Succesfully",
            user
        }) 
    } catch (error) {
        console.log(error);
    }
}

export const userController = {
    createUser,
}