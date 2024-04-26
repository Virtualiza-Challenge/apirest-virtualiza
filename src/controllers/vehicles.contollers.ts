import { RequestHandler } from "express";
import { VehicleServices } from "../domain/services";
import { jsonResponse } from "../helpers/jsonResponse";
import { applyFilters } from "../helpers/applyFilters";

export const getVehiclesInServices: RequestHandler = async (req, res, next) => {
  try {
    const filters = applyFilters(req);
    const result = await VehicleServices.getInServices(filters);
    return res.json(
      jsonResponse({
        count: result.length,
        result,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getVehicles: RequestHandler = async (req, res, next) => {
  try {
    const filters = applyFilters(req);
    const result = await VehicleServices.getAll(filters);
    return res.json(
      jsonResponse({
        count: result.length,
        result,
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
