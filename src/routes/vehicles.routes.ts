import { Router } from "express";
import * as controller from "../controllers/vehicles.contollers";
import { validateSchema } from "../infraestructure/middlewares/validateSchema.middleware";
import {
  VehicleInsertSchema,
  VehicleUpdateSchema,
} from "../infraestructure/schemas/vehicle.schema";

const router = Router();

router.get("/kms-driven-monthly", controller.getVehiclesWithKmsDrivenMonthly);
router.get("/in-services", controller.getVehiclesInServices);
router.get("/", controller.getVehicles);
router.get("/:id", controller.getVehicleByID);
router.post("/", validateSchema(VehicleInsertSchema), controller.createVehicle);
router.put(
  "/:id",
  validateSchema(VehicleUpdateSchema),
  controller.updateVehicle
);
router.delete("/:id", controller.deleteVehicle);

export default router;
