import { FilterAttibutes } from "../../helpers/applyFilters";
import { driverLicenseIsvalid } from "../../helpers/driverLicenseIsvalid";
import { DriverAttributes } from "../../interfaces/Driver";
import { WAHE_MONTH } from "../constants";
import { Driver } from "../models";
import { TripServices } from "./tripServices";

//!! El ranking de choferes rentables se delega al servicio de viajes
const getTopRanking = async (filters: FilterAttibutes) => {
  return await TripServices.getDriversTopRanking(filters);
};

//?? Listado de choferes inhabilitados
const getUnableToDrive = async ({ offset, limit }: FilterAttibutes) => {
  return await Driver.findAll({
    offset,
    limit,
    where: { able_to_drive: false },
  });
};

const getAll = async ({ offset, limit }: FilterAttibutes) => {
  return await Driver.findAll({
    offset,
    limit,
  }).then(async (drivers) => {
    for (const driver of drivers) {
      const totalKMS = await TripServices.drivenKmsByDriverID(
        driver.dataValues.id
      );

      if (totalKMS > 0) {
        const wage_month = totalKMS * WAHE_MONTH;
        driver.dataValues.wage_month = wage_month;
        driver.dataValues.driven_kms = totalKMS ?? 0;
      }
    }
    return drivers;
  });
};

const getByID = async (id: string) => {
  const driver = await Driver.findByPk(id);

  if (!driver) return false;

  const totalKMS = await TripServices.drivenKmsByDriverID(driver.dataValues.id);

  if (totalKMS > 0) {
    const wage_month = totalKMS * WAHE_MONTH;
    driver.setDataValue("wage_month", wage_month);
    driver.setDataValue("driven_kms", totalKMS ?? 0);
  }

  return driver;
};

const create = async (aDriver: DriverAttributes) => {
  const { emision_date, license_type, ...restProps } = aDriver;

  const newDriver = await Driver.create({
    ...restProps,
    able_to_drive: driverLicenseIsvalid(emision_date, license_type),
    emision_date: new Date(emision_date),
    license_type,
  });

  return { id: newDriver.dataValues.id };
};

const update = async (id: string, aDriver: DriverAttributes) => {
  const [result] = await Driver.update(aDriver, { where: { id } });
  return { success: result > 0 };
};

const destroy = async (id: string) => {
  const [result] = await Driver.update({ isActive: false }, { where: { id } });
  return { success: result > 0 };
};

//!! Método para invalidar la licencia de un chofer
const invalidateLicense = async (id: number) => {
  const [result] = await Driver.update(
    { able_to_drive: false },
    { where: { id } }
  );
  return { success: result > 0 };
};

export const DriverServices = {
  getTopRanking,
  getUnableToDrive,
  getAll,
  getByID,
  create,
  update,
  destroy,
  invalidateLicense,
};
