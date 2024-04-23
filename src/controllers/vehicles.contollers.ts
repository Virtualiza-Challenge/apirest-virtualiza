import { Request, Response } from "express";
import { VehicleServices } from "../domain/services";

export const getVehicles = async (_req: Request, res: Response) => {
  const vehicles = await VehicleServices.getAll();
  return res.send(vehicles);
};

export const getVehicleByID = async (req: Request, res: Response) => {
  const vehicleId = String(req.params.id);

  const vehicle = await VehicleServices.getByID(vehicleId);
  return res.send(vehicle);
};

export const createVehicle = async (req: Request, res: Response) => {
  const newVehicle = req.body;

  const vehicle = await VehicleServices.create(newVehicle);
  return res.send(vehicle);
};

export const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.id;
  const bodyVehicle = req.body;

  const success = await VehicleServices.update(vehicleId, bodyVehicle);
  return res.send(success);
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.id;

  const success = await VehicleServices.destroy(vehicleId);
  return res.send({ success });
};
