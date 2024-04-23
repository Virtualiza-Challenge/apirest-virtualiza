import { NextFunction, Request, Response } from "express";
import { DriverServices } from "../services";
import { dateIsLessThan } from "../helpers/dateIsLessThan";

export const checkLicenses = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await DriverServices.getAll();

    for (const driver of result.drivers) {
      if (!dateIsLessThan(driver.dataValues.emision_date)) {
        await DriverServices.invalidateLicense(driver.dataValues.id);
      }
    }

    next();
  } catch (error) {
    console.error("Error al verificar las licencias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
