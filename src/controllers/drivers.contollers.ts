import { Request, Response } from "express";
import { DriverServices } from "../services";

export const getDrivers = async (_req: Request, res: Response) => {
  const drivers = await DriverServices.getAll();
  return res.send(drivers);
};

export const getDriverByID = async (req: Request, res: Response) => {
  const driverId = String(req.params.id);

  const driver = await DriverServices.getByID(driverId);
  return res.send(driver);
};

export const createDriver = async (req: Request, res: Response) => {
  const newDriver = req.body;

  const driver = await DriverServices.create(newDriver);
  return res.send(driver);
};

export const updateDriver = async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const bodyDriver = req.body;

  const success = await DriverServices.update(driverId, bodyDriver);
  return res.send(success);
};

export const deleteDriver = async (req: Request, res: Response) => {
  const driverId = req.params.id;

  const success = await DriverServices.destroy(driverId);
  return res.send({ success });
};
