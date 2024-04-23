import { Router } from "express";
import * as controller from "../controllers/drivers.contollers";
import { checkLicenses } from "../infraestructure/middlewares/checkLicenses";
import { checkLicense } from "../infraestructure/middlewares/checkLicense";

const router = Router();

router.get("/", checkLicenses, controller.getDrivers);
router.get("/:id", checkLicense, controller.getDriverByID);
router.post("/", controller.createDriver);
router.put("/:id", checkLicense, controller.updateDriver);
router.delete("/:id", checkLicense, controller.deleteDriver);

export default router;
