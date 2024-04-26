import { Router } from "express";
import * as controller from "../controllers/drivers.contollers";
import { checkLicenses } from "../infraestructure/middlewares/Drivers/checkLicenses";
import { checkLicense } from "../infraestructure/middlewares/Drivers/checkLicense";
import { validateSchema } from "../infraestructure/middlewares/validateSchema.middleware";
import {
  DriverInsertSchema,
  DriverUpdateSchema,
} from "../infraestructure/schemas/driver.schema";

const router = Router();

router.get(
  "/unable-to-drive",
  checkLicenses,
  controller.getDriversUnableToDrive
);
router.get("/", checkLicenses, controller.getDrivers);
router.get("/:id", checkLicense, controller.getDriverByID);
router.post("/", validateSchema(DriverInsertSchema), controller.createDriver);
router.put(
  "/:id",
  validateSchema(DriverUpdateSchema),
  checkLicense,
  controller.updateDriver
);
router.delete("/:id", checkLicense, controller.deleteDriver);

export default router;
