import { Request, Response } from "express";
import { TripServices } from "../domain/services";

export const getTrips = async (_req: Request, res: Response) => {
  const trips = await TripServices.getAll();
  return res.send(trips);
};

export const getTripByID = async (req: Request, res: Response) => {
  const tripId = String(req.params.id);

  const trip = await TripServices.getByID(tripId);
  return res.send(trip);
};

export const createTrip = async (req: Request, res: Response) => {
  const newTrip = req.body;

  const trip = await TripServices.create(newTrip);
  return res.send(trip);
};

export const updateTrip = async (req: Request, res: Response) => {
  const tripId = req.params.id;
  const bodyTrip = req.body;

  const success = await TripServices.update(tripId, bodyTrip);
  return res.send(success);
};

export const deleteTrip = async (req: Request, res: Response) => {
  const tripId = req.params.id;

  const success = await TripServices.destroy(tripId);
  return res.send({ success });
};
