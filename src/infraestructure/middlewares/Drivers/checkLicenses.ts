import { NextFunction, Request, Response } from "express";
import { DriverServices } from "../../../domain/services";
import { driverLicenseIsvalid } from "../../../helpers/driverLicenseIsvalid";

export const checkLicenses = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await DriverServices.getAll();

    for (const driver of result.drivers) {
      const emision_date = driver?.dataValues.emision_date;
      const license_type = driver?.dataValues.license_type;

      if (!driverLicenseIsvalid(emision_date, license_type)) {
        await DriverServices.invalidateLicense(driver.dataValues.id);
      }
    }

    next();
  } catch (error) {
    console.error("Error al verificar las licencias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
