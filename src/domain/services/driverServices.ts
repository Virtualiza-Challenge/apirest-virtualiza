import { driverLicenseIsvalid } from "../../helpers/driverLicenseIsvalid";
import { DriverProps } from "../../interfaces/Driver";
import { Driver } from "../models";
// import { WAHE_MONTH } from "../constants";

const getAll = async () => {
  const drivers = await Driver.findAll();
  return { count: drivers.length, drivers };
};

const getByID = async (id: string) => {
  const driver = await Driver.findByPk(id);
  return driver;
};

const create = async (aDriver: DriverProps) => {
  const { emision_date, license_type, ...restProps } = aDriver;

  const newDriver = await Driver.create({
    able_to_drive: driverLicenseIsvalid(emision_date, license_type),
    emision_date: new Date(emision_date),
    license_type,
    ...restProps,
  });

  return { id: newDriver.dataValues.id };
};

const update = async (id: string, aDriver: DriverProps) => {
  const [result] = await Driver.update(aDriver, { where: { id } });
  return { success: result > 0 };
};

const destroy = async (id: string) => {
  const [result] = await Driver.update({ isActive: false }, { where: { id } });
  return { success: result > 0 };
};

const invalidateLicense = async (id: string) => {
  const [result] = await Driver.update(
    { able_to_drive: false },
    { where: { id } }
  );
  return { success: result > 0 };
};

export const DriverServices = {
  getAll,
  getByID,
  create,
  update,
  destroy,
  invalidateLicense,
};
