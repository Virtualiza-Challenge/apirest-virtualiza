import express from "express";
import driversRoutes from "./routes/drivers.routes";
import vehiclesRoutes from "./routes/vehicles.routes";
import tripsRoutes from "./routes/trips.routes";
import { Paths } from "./routes/paths";

export const app = express();

app.use(express.json());

app.use(Paths.DRIVERS, driversRoutes);
app.use(Paths.VEHICLES, vehiclesRoutes);
app.use(Paths.TRIPS, tripsRoutes);