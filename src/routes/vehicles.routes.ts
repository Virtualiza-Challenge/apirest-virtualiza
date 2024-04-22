import { Router } from "express";
import * as controller from "../controllers/vehicles.contollers";

const router = Router();

router.get("/", controller.getVehicles);
router.get("/:id", controller.getVehicleByID);
router.post("/", controller.createVehicle);
router.put("/:id", controller.updateVehicle);
router.delete("/:id", controller.deleteVehicle);

export default router;
