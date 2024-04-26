import { FilterAttibutes } from "../../helpers/applyFilters";
import { VehicleAttributes } from "../../interfaces/Vehicle";
import { RESET_KMS_VEHICLE, SERVICE_MILEAGE } from "../constants";
import { Vehicle } from "../models";
import { TripServices } from "./tripServices";

const getAllWithKmsDrivenMonthly = async (filters: FilterAttibutes) => {
  return await TripServices.getVehiclesWithKmsDrivenMonthly(filters);
};

const getInServices = async ({ offset, limit }: FilterAttibutes) => {
  return await Vehicle.findAll({
    offset,
    limit,
    where: { is_available: false },
  });
};

const getAll = async ({ offset, limit }: FilterAttibutes) => {
  return await Vehicle.findAll({ offset, limit });
};

const getByID = async (id: string) => {
  return await Vehicle.findByPk(id);
};

const create = async (aVehicle: VehicleAttributes) => {
  const newVehicle = await Vehicle.create({ ...aVehicle });
  return { id: newVehicle.dataValues.id };
};

const update = async (id: string, aVehicle: VehicleAttributes) => {
  const [result] = await Vehicle.update(aVehicle, { where: { id } });
  return { success: result > 0 };
};

const destroy = async (id: string) => {
  const [result] = await Vehicle.update({ isActive: false }, { where: { id } });
  return { success: result > 0 };
};

const loadMileage = async (id: number, mileage: number) => {
  const vehicle = await VehicleServices.getByID(id + "");

  if (!vehicle) return { success: false };

  const kmsAcum = vehicle.dataValues.kms + mileage;

  const [result] = await Vehicle.update(
    { kms: kmsAcum, is_available: kmsAcum < SERVICE_MILEAGE },
    { where: { id } }
  );

  return { success: result > 0 };
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
  getInServices,
  getAllWithKmsDrivenMonthly,
};
