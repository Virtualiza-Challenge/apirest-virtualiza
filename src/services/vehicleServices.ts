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
  const {
    name,
    surname,
    dni,
    license,
    license_type,
    emision_date,
    able_to_drive,
  } = aDriver;

  const newDriver = await Driver.create({
    name,
    surname,
    dni,
    license,
    license_type,
    emision_date,
    able_to_drive,
  });

  return newDriver;
};

export const updateDriver = async (id: string, aDriver: DriverProps) => {
  const [result] = await Driver.update(aDriver, { where: { id } });
  return { success: result > 0 };
};

export const deleteDriver = async (id: string) => {
  const success = await Driver.destroy({ where: { id } });
  return success > 0;
};
