import { NextFunction, Request, Response } from "express";
import { DriverServices } from "../services";
import { dateIsLessThan } from "../helpers/dateIsLessThan";

export const checkLicense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const driverId = req.params.id;
  const driver = await DriverServices.getByID(driverId);

  if (dateIsLessThan(driver?.dataValues.emision_date)) {
    return res.send(driver);
  } else {
    await DriverServices.invalidateLicense(driverId);
    next();
  }
};
