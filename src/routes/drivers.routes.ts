import { Router } from "express";
import * as controller from "../controllers/drivers.contollers";
import { checkLicense } from "../middlewares/checkLicense";
import { checkLicenses } from "../middlewares/checkLicenses";

const router = Router();

router.get("/", checkLicenses, controller.getDrivers);
router.get("/:id", checkLicense, controller.getDriverByID);
router.post("/", controller.createDriver);
router.put("/:id", checkLicense, controller.updateDriver);
router.delete("/:id", checkLicense, controller.deleteDriver);

export default router;
