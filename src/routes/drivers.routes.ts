import { Router } from "express";
import * as controller from "../controllers/drivers.contollers";

const router = Router();

router.get("/", controller.getDrivers);
router.get("/:id", controller.getDriverByID);
router.post("/", controller.createDriver);
router.put("/:id", controller.updateDriver);
router.delete("/:id", controller.deleteDriver);

export default router;
