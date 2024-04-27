import { NextFunction, Request, Response } from "express";
import { DriverServices } from "../../../domain/services";
import { driverLicenseIsvalid } from "../../../helpers/driverLicenseIsvalid";
import { applyFilters } from "../../../helpers/applyFilters";

export const checkLicenses = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const filters = applyFilters(req);
    const drivers = await DriverServices.getAll(filters);

    for (const driver of drivers) {
      const emision_date = driver?.dataValues.emision_date;
      const license_type = driver?.dataValues.license_type;

      if (!driverLicenseIsvalid(emision_date, license_type)) {
        await DriverServices.invalidateLicense(driver.dataValues.id);
      }
    }

    next();
  } catch (error) {
    console.error("Error al verificar las licencias: ", error);
    next(error);
  }
};
