import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response, next: NextFunction)=>{
    res.status(StatusCodes.OK).json({
        meassage: "Welcome to Parcel delivery App"
    });
});

export default app;