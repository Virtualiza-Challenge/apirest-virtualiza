import { RequestHandler } from "express";
import { VehicleServices } from "../domain/services";
import { jsonResponse } from "../helpers/jsonResponse";

export const getVehicles: RequestHandler = async (_req, res, next) => {
  try {
    const result = await VehicleServices.getAll();
    return res.json(
      jsonResponse({
        count: result.count,
        result: result.vehicles,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getVehicleByID: RequestHandler = async (req, res, next) => {
  try {
    const vehicle = await VehicleServices.getByID(req.params.id);
    return res.json(jsonResponse({ result: vehicle }));
  } catch (error) {
    next(error);
  }
};

export const createVehicle: RequestHandler = async (req, res, next) => {
  try {
    const vehicle = await VehicleServices.create(req.body);
    return res.status(201).json(jsonResponse({ result: vehicle }));
  } catch (error) {
    next(error);
  }
};

export const updateVehicle: RequestHandler = async (req, res, next) => {
  try {
    const success = await VehicleServices.update(req.params.id, req.body);
    return res.json(jsonResponse({ result: success }));
  } catch (error) {
    next(error);
  }
};

export const deleteVehicle: RequestHandler = async (req, res, next) => {
  try {
    const success = await VehicleServices.destroy(req.params.id);
    return res.json(jsonResponse({ result: success }));
  } catch (error) {
    next(error);
  }
};
