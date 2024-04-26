import { RequestHandler } from "express";
import { DriverServices } from "../domain/services";
import { jsonResponse } from "../helpers/jsonResponse";

export const getDrivers: RequestHandler = async (_req, res, next) => {
  try {
    const result = await DriverServices.getAll();
    return res.json(
      jsonResponse({
        count: result.count,
        result: result.drivers,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getDriverByID: RequestHandler = async (req, res, next) => {
  try {
    const driver = await DriverServices.getByID(req.params.id);

    return res.json(jsonResponse({ result: driver }));
  } catch (error) {
    next(error);
  }
};

export const createDriver: RequestHandler = async (req, res, next) => {
  try {
    const driver = await DriverServices.create(req.body);

    return res.status(201).json(jsonResponse({ result: driver }));
  } catch (error) {
    next(error);
  }
};

export const updateDriver: RequestHandler = async (req, res, next) => {
  try {
    const success = await DriverServices.update(req.params.id, req.body);

    return res.json(jsonResponse({ result: success }));
  } catch (error) {
    next(error);
  }
};

export const deleteDriver: RequestHandler = async (req, res, next) => {
  try {
    const success = await DriverServices.destroy(req.params.id);

    return res.json(jsonResponse({ result: success }));
  } catch (error) {
    next(error);
  }
};
