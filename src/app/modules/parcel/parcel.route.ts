import { Router } from "express";
import { parcelController } from "./parcel.control";
import { checkAuth } from "../../auth/checkAuth";

const router = Router();

router.post(
  "/create-parcel",
  checkAuth("USER", "ADMIN", "SUPER_ADMIN"),
  parcelController.createParcel
);
router.get(
  "/me",
  checkAuth("USER","ADMIN", "SUPER_ADMIN"),
  parcelController.getAllParcel
);
router.patch(
  "/update/:id",
  checkAuth("ADMIN", "SUPER_ADMIN"),
  parcelController.updateParcel
);
router.delete(
  "/delete/:id",
  checkAuth("ADMIN","SUPER_ADMIN"),
  parcelController.deleteParcel
);
router.patch(
  "/receiver/update/:id",
  checkAuth("USER","RECEIVER"),
  parcelController.upadateReceiverStatus
);

router.get(
  "/tracking/:trackingId",
  checkAuth("USER","ADMIN","SUPER_ADMIN"),
  parcelController.getParcelByTrackingId
)


export const parcelRoutes = router;
