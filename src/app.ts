import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { router } from "./app/routes";
import { globalErrorhandler } from "./app/middlewares/globalErrorhandler";
import { notFound } from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);





app.get("/", (req: Request, res: Response, next: NextFunction)=>{
    res.status(StatusCodes.OK).json({
        meassage: "Welcome to Parcel delivery App"
    });
});

app.use(globalErrorhandler);
app.use(notFound);


export default app;