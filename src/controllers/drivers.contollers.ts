import { Request, Response } from "express";
import * as driverServices from "../services/driverServices";

export const getDrivers = async (_req: Request, res: Response) => {
  const drivers = await driverServices.getAll();
  return res.send(drivers);
};

export const getDriverByID = async (req: Request, res: Response) => {
  const driver = await driverServices.getByID(String(req.params.id));
  return res.send(driver);
};

export const createDriver = async (req: Request, res: Response) => {
  const newDriver = req.body;
  const driver = driverServices.createDriver(newDriver);
  return res.send({ driver });
};

export const updateDriver = async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const bodyDriver = req.body;
  const success = await driverServices.updateDriver(driverId, bodyDriver);

  return res.send(success);
};

export const deleteDriver = async (req: Request, res: Response) => {
  const driverId = req.params.id;

  const success = await driverServices.deleteDriver(driverId);

  return res.send({ success });
};
