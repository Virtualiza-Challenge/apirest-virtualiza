import { VehicleProps } from "../../interfaces/Vehicle";
import { RESET_KMS_VEHICLE, SERVICE_MILEAGE } from "../constants";
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
  const [result] = await Vehicle.update({ isActive: false }, { where: { id } });
  return { success: result > 0 };
};

const loadMileage = async (id: string, mileage: number) => {
  const [_, success] = await Vehicle.increment(
    { kms: +mileage },
    { where: { id } }
  );

  if (!success) return { success: false };

  const vehicle = await VehicleServices.getByID(id);

  if (vehicle?.dataValues.kms >= SERVICE_MILEAGE) {
    await Vehicle.update({ is_available: false }, { where: { id } });
  }

  return { success: true };
};

const ready = async (id: string) => {
  const [result] = await Vehicle.update(
    { kms: RESET_KMS_VEHICLE },
    { where: { id } }
  );
  return { success: result > 0 };
};

export const VehicleServices = {
  getAll,
  getByID,
  create,
  update,
  destroy,
  ready,
  loadMileage,
};
