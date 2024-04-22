import { Router } from "express";
import * as controller from "../controllers/trips.contollers";

const router = Router();

router.get("/", controller.getTrips);
router.get("/:id", controller.getTripByID);
router.post("/", controller.createTrip);
router.put("/:id", controller.updateTrip);
router.delete("/:id", controller.deleteTrip);

export default router;
