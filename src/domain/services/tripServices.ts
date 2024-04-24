import { Op } from "sequelize";
import { TripProps, TripUpdateProps } from "../../interfaces/Trip";
import { FIRST_DAY_OF_MONTH, LAST_DAY_OF_MONTH } from "../constants";
import { Trip } from "../models";
import { DriverServices } from "./driverServices";
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
  const { driver_id, vehicle_id, kms, ...restProps } = aDriver;

  const driverFound = await DriverServices.getByID(driver_id + "");
  const vehicleFound = await VehicleServices.getByID(vehicle_id + "");

  if (!driverFound || !vehicleFound) return false;

  const newTrip = await Trip.create({
    ...restProps,
    kms,
    driver_id: driverFound.dataValues.id,
    vehicle_id: vehicleFound.dataValues.id,
  });

  await VehicleServices.loadMileage(vehicleFound.dataValues.id, kms);

  return { id: newTrip.dataValues.id };
};

const update = async (id: string, aTrip: TripUpdateProps) => {
  const [result] = await Trip.update(aTrip, { where: { id } });
  return { success: result > 0 };
};

const destroy = async (id: string) => {
  const [result] = await Trip.update({ isCanceled: true }, { where: { id } });
  return { success: result > 0 };
};

const drivenKmsByID = async (id: string) => {
  const totalKMS = await Trip.sum("kms", {
    where: {
      driver_id: id,
      date: {
        [Op.between]: [FIRST_DAY_OF_MONTH, LAST_DAY_OF_MONTH],
      },
    },
  });

  return totalKMS;
};

export const TripServices = {
  getAll,
  getByID,
  create,
  update,
  destroy,
  drivenKmsByID,
};
