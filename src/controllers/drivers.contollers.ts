import { Request, Response } from "express";

export const getDrivers = async (_req: Request, res: Response) => {
  return res.send("All drivers...");
};

export const getDriverByID = async (_req: Request, res: Response) => {
  return res.send("An driver by ID!");
};

export const createDriver = async (_req: Request, res: Response) => {
  return res.send("A new driver insert!");
};

export const updateDriver = async (_req: Request, res: Response) => {
  return res.send("Driver updated!");
};

export const deleteDriver = async (_req: Request, res: Response) => {
  return res.send("Driver deleted!");
};
