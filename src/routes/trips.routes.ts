import { Router } from "express";
import {
  getTrips,
  getTripByID,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/trips.contollers";

const router = Router();

router.get("/", getTrips);
router.get("/:id", getTripByID);
router.post("/", createTrip);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

export default router;
