import { RequestHandler } from "express";
import { DriverServices } from "../domain/services";

export const getDrivers: RequestHandler = async (_req, res, next) => {
  try {
    const drivers = await DriverServices.getAll();
    return res.json(drivers);
  } catch (error) {
    next(error);
  }
};

export const getDriverByID: RequestHandler = async (req, res, next) => {
  try {
    const driverId = String(req.params.id);

    const driver = await DriverServices.getByID(driverId);

    return res.json(driver);
  } catch (error) {
    next(error);
  }
};

export const createDriver: RequestHandler = async (req, res, next) => {
  try {
    const newDriver = req.body;

    const driver = await DriverServices.create(newDriver);

    return res.status(201).json(driver);
  } catch (error) {
    next(error);
  }
};

export const updateDriver: RequestHandler = async (req, res, next) => {
  try {
    const driverId = req.params.id;
    const bodyDriver = req.body;

    const success = await DriverServices.update(driverId, bodyDriver);

    return res.json(success);
  } catch (error) {
    next(error);
  }
};

export const deleteDriver: RequestHandler = async (req, res, next) => {
  try {
    const driverId = req.params.id;

    const success = await DriverServices.destroy(driverId);

    return res.json({ success });
  } catch (error) {
    next(error);
  }
};
