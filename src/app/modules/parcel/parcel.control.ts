import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { parcelService } from "./parcel.service";
import { StatusCodes } from "http-status-codes";
import { success } from "zod";
import { JwtPayload } from "jsonwebtoken";
import { Parcel } from "./parcel.model";
import { Types } from "mongoose";

const createParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const parcel = await parcelService.createParcel(req.body, user.userId);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Parcel created successfully",
      data: parcel
    });
  }
);

const getRecieverParcel = async (query: Record<string, string>) => {
  const parcels = await Parcel.find(query)
    .populate("sender", "name email")
    .populate("receiver", "name email");

  const totalParcel = await Parcel.countDocuments(query);

  return {
    data: parcels,
    meta: { totalParcel },
  };
};

const getAllParcel = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const user = req.user as JwtPayload;
  let query: Record<string, any> = {};
  if(user.role === "USER"){
    query.$or = [
    { sender: new Types.ObjectId(user.userId) },
    { receiver: new Types.ObjectId(user.userId) }
  ]
  }
  else if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
    if (req.query.status) {
      query.status = req.query.status; 
    }
  }

    const result = await parcelService.getAllParcel(query);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Data retrieved successfully",
        data: result.data,
        meta: result.meta
    });
})



const updateParcel = catchAsync(
  async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;
    const updatedItem = await parcelService.updateParcel(id, payload);
    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Parcel updated successfully",
      data: updatedItem
    })
  }
);


const upadateReceiverStatus = catchAsync(
  async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload = req.body;
    const updatedItem = await parcelService.updateParcel(id, payload);
    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Parcel updated successfully",
      data: updatedItem
    })
  }
);

const deleteParcel = catchAsync(
  async(req: Request, res: Response, NextFunction) => {
    const { id } = req.params;
    const result = await parcelService.deleteParcel(id);
    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Parcel deleted successfully",
    })
  }
)

const getParcelByTrackingId = catchAsync(
  async(req: Request, res: Response, next: NextFunction) => {
    const { trackingId } = req.params;
    const result = await parcelService.getParcelByTrackingId(trackingId);
    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Parcel found by tracking ID",
      data: result
    })
  }
)

export const parcelController = {
  createParcel,
  getAllParcel,
  getRecieverParcel,
  updateParcel,
  deleteParcel,
  upadateReceiverStatus,
  getParcelByTrackingId
};
