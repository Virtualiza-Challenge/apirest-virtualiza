import cors from "cors";
import express from "express";
import { handlerError } from "./infraestructure/middlewares/handlerError";
import driversRoutes from "./routes/drivers.routes";
import { Paths } from "./routes/paths";
import tripsRoutes from "./routes/trips.routes";
import vehiclesRoutes from "./routes/vehicles.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(Paths.DRIVERS, driversRoutes);
app.use(Paths.VEHICLES, vehiclesRoutes);
app.use(Paths.TRIPS, tripsRoutes);

app.use(handlerError);
