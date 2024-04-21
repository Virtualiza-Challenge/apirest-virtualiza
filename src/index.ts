import express from "express";
import { sequelize } from "./database";
import driversRoutes from "./routes/drivers.routes";
import vehiclesRoutes from "./routes/vehicles.routes";
import tripsRoutes from "./routes/trips.routes";
import { Paths } from "./routes/paths";

import "./models/Driver";
import "./models/Vehicle";
import "./models/Trip";

const app = express();

app.use(express.json());

app.use(Paths.DRIVERS, driversRoutes);
app.use(Paths.VEHICLES, vehiclesRoutes);
app.use(Paths.TRIPS, tripsRoutes);

const PORT = 3000;

const main = async () => {
  try {
    await sequelize.sync();
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log("Server on port: ", PORT);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

void main();
