import { TripProps, TripUpdateProps } from "../interfaces/Trip";
import { Trip } from "../models";
import { VehicleServices } from "./vehicleServices";

const getAll = async () => {
  const trips = await Trip.findAll();
  return { count: trips.length, trips };
};

const getByID = async (id: string) => {
  const trip = await Trip.findByPk(id);
  return trip;
};

const create = async (aDriver: TripProps) => {
  const { driver_id, vehicle_id, ...restProps } = aDriver;

  const driverFound = await DriverServices.getByID(driver_id + "");
  const vehicleFound = await VehicleServices.getByID(vehicle_id + "");

  if (!driverFound || !vehicleFound) return false;

  const newTrip = await Trip.create({
    ...restProps,
    driver_id: driverFound.dataValues.id,
    vehicle_id: vehicleFound.dataValues.id,
  });

  return { id: newTrip.dataValues.id };
};

const update = async (id: string, aTrip: TripUpdateProps) => {
  const [result] = await Trip.update(aTrip, { where: { id } });
  return { success: result > 0 };
};

const destroy = async (id: string) => {
  const success = await Trip.destroy({ where: { id } });
  return success > 0;
};

export const DriverServices = {
  getAll,
  getByID,
  create,
  update,
  destroy,
};
