import { Router } from "express";
import { userController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../auth/checkAuth";
import { Role } from "./user.interface";

const router = Router();


router.post(
  "/auth/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);

router.get(
  "/all-users",
  checkAuth("ADMIN","SUPER_ADMIN"),
  userController.getAllUsers
);
router.get(
  "/me/:id",
  checkAuth("ADMIN","SUPER_ADMIN","USER"),
  userController.getSingleUser
);
router.patch(
  "/role/:id",
  checkAuth("SUPER_ADMIN"), 
  userController.updateUser
);

router.patch(
  "/update/:id",
  checkAuth(...Object.values(Role)),
  userController.updateUser
);

router.delete(
  "/delete/:id",
  checkAuth("ADMIN","SUPER_ADMIN"),
  userController.deleteUser
)

export const userRoutes = router;
