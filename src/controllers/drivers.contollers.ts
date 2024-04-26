import { NextFunction, Request, Response } from "express";
import { DriverServices } from "../domain/services";

export const getDrivers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drivers = await DriverServices.getAll();
    throw new Error("Error en la BD");

    return res.json(drivers);
  } catch (error) {
    next(error);
  }
};

export const getDriverByID = async (req: Request, res: Response) => {
  const driverId = String(req.params.id);

  const driver = await DriverServices.getByID(driverId);

  return res.json(driver);
};

export const createDriver = async (req: Request, res: Response) => {
  const newDriver = req.body;

  const driver = await DriverServices.create(newDriver);

  return res.status(201).json(driver);
};

export const updateDriver = async (req: Request, res: Response) => {
  const driverId = req.params.id;
  const bodyDriver = req.body;

  const success = await DriverServices.update(driverId, bodyDriver);

  return res.json(success);
};

export const deleteDriver = async (req: Request, res: Response) => {
  const driverId = req.params.id;

  const success = await DriverServices.destroy(driverId);

  return res.json({ success });
};
