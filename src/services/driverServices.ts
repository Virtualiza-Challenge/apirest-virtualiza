import { DriverProps } from "../interfaces/Driver";
import { Driver } from "../models";

export const getAll = async () => {
  const drivers = await Driver.findAll();
  return { count: drivers.length, drivers };
};

export const getByID = async (id: string) => {
  const driver = await Driver.findByPk(id);
  return driver;
};

export const createDriver = async (aDriver: DriverProps) => {
  const newDriver = await Driver.create({ ...aDriver });
  return { id: newDriver.dataValues.id };
};

export const updateDriver = async (id: string, aDriver: DriverProps) => {
  const [result] = await Driver.update(aDriver, { where: { id } });
  return { success: result > 0 };
};

export const deleteDriver = async (id: string) => {
  const success = await Driver.destroy({ where: { id } });
  return success > 0;
};
