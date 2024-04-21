import { Request, Response } from "express";

export const getTrips = async (_req: Request, res: Response) => {
  return res.send("All trips...");
};

export const getTripByID = async (_req: Request, res: Response) => {
  return res.send("An trip by ID!");
};

export const createTrip = async (_req: Request, res: Response) => {
  return res.send("A new trip insert!");
};

export const updateTrip = async (_req: Request, res: Response) => {
  return res.send("Trip updated!");
};

export const deleteTrip = async (_req: Request, res: Response) => {
  return res.send("Trip deleted!");
};
