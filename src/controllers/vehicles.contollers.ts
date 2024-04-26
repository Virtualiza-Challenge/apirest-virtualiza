import { RequestHandler } from "express";
import { VehicleServices } from "../domain/services";

export const getVehicles: RequestHandler = async (_req, res, next) => {
  try {
    const vehicles = await VehicleServices.getAll();
    return res.send(vehicles);
  } catch (error) {
    next(error);
  }
};

export const getVehicleByID: RequestHandler = async (req, res, next) => {
  try {
    const vehicleId = String(req.params.id);

    const vehicle = await VehicleServices.getByID(vehicleId);
    return res.send(vehicle);
  } catch (error) {
    next(error);
  }
};

export const createVehicle: RequestHandler = async (req, res, next) => {
  try {
    const newVehicle = req.body;

    const vehicle = await VehicleServices.create(newVehicle);
    return res.send(vehicle);
  } catch (error) {
    next(error);
  }
};

export const updateVehicle: RequestHandler = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const bodyVehicle = req.body;

    const success = await VehicleServices.update(vehicleId, bodyVehicle);
    return res.send(success);
  } catch (error) {
    next(error);
  }
};

export const deleteVehicle: RequestHandler = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;

    const success = await VehicleServices.destroy(vehicleId);
    return res.send({ success });
  } catch (error) {
    next(error);
  }
};
