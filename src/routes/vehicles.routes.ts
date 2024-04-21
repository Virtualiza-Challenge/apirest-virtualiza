import { Router } from "express";
import {
  getVehicles,
  getVehicleByID,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicles.contollers";

const router = Router();

router.get("/", getVehicles);
router.get("/:id", getVehicleByID);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
