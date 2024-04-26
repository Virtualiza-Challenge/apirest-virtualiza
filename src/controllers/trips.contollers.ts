import { RequestHandler } from "express";
import { TripServices } from "../domain/services";

export const getTrips: RequestHandler = async (req, res, next) => {
  try {
    const offset = Number(req.query._offset) || 0;
    const limit = req.query._limit ? Number(req.query._limit) : null;
    const trips = await TripServices.getAll(offset, limit);
    return res.send(trips);
  } catch (error) {
    next(error);
  }
};

export const getTripByID: RequestHandler = async (req, res, next) => {
  try {
    const tripId = String(req.params.id);

    const trip = await TripServices.getByID(tripId);
    return res.send(trip);
  } catch (error) {
    next(error);
  }
};

export const createTrip: RequestHandler = async (req, res, next) => {
  try {
    const newTrip = req.body;

    const trip = await TripServices.create(newTrip);
    return res.send(trip);
  } catch (error) {
    next(error);
  }
};

export const updateTrip: RequestHandler = async (req, res, next) => {
  try {
    const tripId = req.params.id;
    const bodyTrip = req.body;

    const success = await TripServices.update(tripId, bodyTrip);
    return res.send(success);
  } catch (error) {
    next(error);
  }
};

export const deleteTrip: RequestHandler = async (req, res, next) => {
  try {
    const tripId = req.params.id;

    const success = await TripServices.destroy(tripId);
    return res.send({ success });
  } catch (error) {
    next(error);
  }
};
