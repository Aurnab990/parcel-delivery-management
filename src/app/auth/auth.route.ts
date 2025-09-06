import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import passport from "passport";

const router = Router();

router.post("/login", authControllers.credentialLogin);
router.post("/logout", authControllers.credentialLogout);
router.post("/refresh-token", authControllers.getAccessToken);
router.get("/google", async(req: Request, res: Response, next: NextFunction)=>{
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", { scope:["profile", "email"], state: redirect as string})(req,res)
});
router.get("/google/callback",passport.authenticate("google",{
    failureRedirect: "/login"
}), authControllers.googleCallBack);

export const authRoutes = router;