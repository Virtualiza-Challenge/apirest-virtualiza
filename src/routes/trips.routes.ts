import { Router } from "express";
import * as controller from "../controllers/trips.contollers";
import { validateSchema } from "../infraestructure/middlewares/validateSchema.middleware";
import {
  TripInsertSchema,
  TripUpdateSchema,
} from "../infraestructure/schemas/trip.schema";

const router = Router();

router.get("/", controller.getTrips);
router.get("/:id", controller.getTripByID);
router.get("/:id/driver/vehicle", controller.getTripByIDPopulate);
router.post("/", validateSchema(TripInsertSchema), controller.createTrip);
router.put("/:id", validateSchema(TripUpdateSchema), controller.updateTrip);
router.delete("/:id", controller.deleteTrip);

export default router;
