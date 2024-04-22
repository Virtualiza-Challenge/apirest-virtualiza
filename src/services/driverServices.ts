import { DriverProps } from "../interfaces/Driver";
import { Driver } from "../models";

const getAll = async () => {
  const drivers = await Driver.findAll();
  return { count: drivers.length, drivers };
};

const getByID = async (id: string) => {
  const driver = await Driver.findByPk(id);
  return driver;
};

const create = async (aDriver: DriverProps) => {
  const newDriver = await Driver.create({ ...aDriver });
  return { id: newDriver.dataValues.id };
};

const update = async (id: string, aDriver: DriverProps) => {
  const [result] = await Driver.update(aDriver, { where: { id } });
  return { success: result > 0 };
};

const destroy = async (id: string) => {
  // const success = await Driver.destroy({ where: { id } });
  // return success > 0;
  const [result] = await Driver.update({ isActive: false }, { where: { id } });
  return { success: result > 0 };
};

export const DriverServices = {
  getAll,
  getByID,
  create,
  update,
  destroy,
};
