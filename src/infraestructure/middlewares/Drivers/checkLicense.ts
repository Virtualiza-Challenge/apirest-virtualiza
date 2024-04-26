import { NextFunction, Request, Response } from "express";
import { DriverServices } from "../../../domain/services";
import { driverLicenseIsvalid } from "../../../helpers/driverLicenseIsvalid";
import { jsonResponse } from "../../../helpers/jsonResponse";

export const checkLicense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const driverId = req.params.id;
  const driver = await DriverServices.getByID(driverId);

  if (!driver) return res.json(jsonResponse({ result: driver }));

  const emision_date = driver?.dataValues.emision_date;
  const license_type = driver?.dataValues.license_type;

  if (driverLicenseIsvalid(emision_date, license_type)) {
    return res.send(driver);
  } else {
    await DriverServices.invalidateLicense(Number(driverId));
    next();
  }
};
