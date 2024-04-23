import { driverLicenseIsvalid } from "../../helpers/driverLicenseIsvalid";
import { DriverProps } from "../../interfaces/Driver";
import { Driver, Trip } from "../models";
import { Op } from "sequelize";
import { WAHE_MONTH } from "../constants";

const getAll = async () => {
  // Obtener la fecha actual
  const currentDate = new Date();

  // Obtener el primer día del mes actual
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Obtener el último día del mes actual
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const drivers = await Driver.findAll().then(async (drivers) => {
    for (const driver of drivers) {
      const totalKMS = await Trip.sum("kms", {
        where: {
          driver_id: driver.dataValues.id,
          date: {
            [Op.between]: [firstDayOfMonth, lastDayOfMonth],
          },
        },
      });

      const wage_month = totalKMS * WAHE_MONTH;
      driver.dataValues.wage_month = wage_month;
      driver.dataValues.driven_kms = totalKMS ?? 0;
    }

    return drivers;
  });

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
