import { FilterAttibutes } from "../../helpers/applyFilters";
import { VehicleAttributes } from "../../interfaces/Vehicle";
import { RESET_KMS_VEHICLE, SERVICE_MILEAGE } from "../constants";
import { Vehicle } from "../models";
import { TripServices } from "./tripServices";

//!! El listado de vehiculos con su kilometraje mensual es delegado al servicio de viajes
const getAllWithKmsDrivenMonthly = async (filters: FilterAttibutes) => {
  return await TripServices.getVehiclesWithKmsDrivenMonthly(filters);
};

//?? Listado de vehiculos en el taller
const getInServices = async ({ offset, limit }: FilterAttibutes) => {
  return await Vehicle.findAll({
    offset,
    limit,
    where: { is_available: false },
  });
};

const getAll = async (filters: FilterAttibutes) => {
  return await Vehicle.findAll(filters);
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

//?? Método para acumular los kms en cada viaje
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

//?? Método para resetear el contador de kms para el services
const ready = async (id: string) => {
  const [result] = await Vehicle.update(
    { kms: RESET_KMS_VEHICLE, is_available: true },
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
