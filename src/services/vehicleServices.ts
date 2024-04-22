import { VehicleProps } from "../interfaces/Vehicle";
import { Vehicle } from "../models";

const getAll = async () => {
  const vehicles = await Vehicle.findAll();
  return { count: vehicles.length, vehicles };
};

const getByID = async (id: string) => {
  const vehicle = await Vehicle.findByPk(id);
  return vehicle;
};

const create = async (aVehicle: VehicleProps) => {
  const newVehicle = await Vehicle.create({ ...aVehicle });
  return { id: newVehicle.dataValues.id };
};

const update = async (id: string, aVehicle: VehicleProps) => {
  const [result] = await Vehicle.update(aVehicle, { where: { id } });
  return { success: result > 0 };
};

const destroy = async (id: string) => {
  // const success = await Vehicle.destroy({ where: { id } });
  // return success > 0;
  const [result] = await Vehicle.update({ isActive: false }, { where: { id } });
  return { success: result > 0 };
};

export const VehicleServices = {
  getAll,
  getByID,
  create,
  update,
  destroy,
};
