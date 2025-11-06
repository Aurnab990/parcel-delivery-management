import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { router } from "./app/routes";
import { globalErrorhandler } from "./app/middlewares/globalErrorhandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import "../src/app/config/passport";
import session from "express-session";
import { envVar } from "./app/config/env";

// Changed here
const app = express();
app.use(cors({
    origin: envVar.FRONTEND_URL,
    credentials: true
}));


app.use(session({
    secret: envVar.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);


app.use("/api", router);





app.get("/", (req: Request, res: Response, next: NextFunction)=>{
    res.status(StatusCodes.OK).json({
        meassage: "Welcome to Parcel delivery App"
    });
});

app.use(globalErrorhandler);
app.use(notFound);


export default app;