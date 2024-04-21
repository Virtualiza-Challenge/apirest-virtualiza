import { Router } from "express";
import {
  getDrivers,
  getDriverByID,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../controllers/drivers.contollers";

const router = Router();

router.get("/", getDrivers);
router.get("/:id", getDriverByID);
router.post("/", createDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

export default router;
