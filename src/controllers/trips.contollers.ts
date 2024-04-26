import { RequestHandler } from "express";
import { TripServices } from "../domain/services";
import { jsonResponse } from "../helpers/jsonResponse";

export const getTrips: RequestHandler = async (req, res, next) => {
  try {
    const offset = Number(req.query._offset) || 0;
    const limit = req.query._limit ? Number(req.query._limit) : null;

    const result = await TripServices.getAll(offset, limit);

    return res.json(
      jsonResponse({
        count: result.count,
        result: result.trips,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getTripByID: RequestHandler = async (req, res, next) => {
  try {
    const trip = await TripServices.getByID(req.params.id);
    return res.json(jsonResponse({ result: trip }));
  } catch (error) {
    next(error);
  }
};

export const createTrip: RequestHandler = async (req, res, next) => {
  try {
    const trip = await TripServices.create(req.body);
    return res.json(jsonResponse({ result: trip }));
  } catch (error) {
    next(error);
  }
};

export const updateTrip: RequestHandler = async (req, res, next) => {
  try {
    const success = await TripServices.update(req.params.id, req.body);
    return res.json(jsonResponse({ result: success }));
  } catch (error) {
    next(error);
  }
};

export const deleteTrip: RequestHandler = async (req, res, next) => {
  try {
    const success = await TripServices.destroy(req.params.id);
    return res.json(jsonResponse({ result: success }));
  } catch (error) {
    next(error);
  }
};
