"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
const routes_1 = require("./app/routes");
const globalErrorhandler_1 = require("./app/middlewares/globalErrorhandler");
const notFound_1 = require("./app/middlewares/notFound");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
require("../src/app/config/passport");
const express_session_1 = __importDefault(require("express-session"));
const env_1 = require("./app/config/env");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: env_1.envVar.FRONTEND_URL,
    credentials: true
}));
app.options("*", (0, cors_1.default)({
    origin: env_1.envVar.FRONTEND_URL,
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: env_1.envVar.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.set("trust proxy", 1);
app.use("/api", routes_1.router);
app.get("/", (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({
        meassage: "Welcome to Parcel delivery App"
    });
});
app.use(globalErrorhandler_1.globalErrorhandler);
app.use(notFound_1.notFound);
exports.default = app;
