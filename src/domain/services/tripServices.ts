import { Op } from "sequelize";
import { TripAttributes } from "../../interfaces/Trip";
import { FIRST_DAY_OF_MONTH, LAST_DAY_OF_MONTH } from "../constants";
import { Trip } from "../models";
import { DriverServices } from "./driverServices";
import { VehicleServices } from "./vehicleServices";

const getAll = async (offset: number = 0, limit: number | null = null) => {
  const trips = await Trip.findAll({
    attributes: ["id", "date", "hour", "minutes", "kms"],
    include: [
      {
        association: "driver",
        where: { isActive: true },
        attributes: ["name", "surname"],
      },
      {
        association: "vehicle",
        where: { isActive: true },
        attributes: ["plate", "brand", "model"],
      },
    ],
    offset,
    limit: limit !== null ? limit : undefined,
  });

  const count = await Trip.count();

  return { count, trips };
};

const getByID = async (id: string) => {
  const trip = await Trip.findByPk(id);
  return trip;
};

const create = async (aDriver: TripAttributes) => {
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

const update = async (id: string, aTrip: TripAttributes) => {
  if (!!aTrip.kms) {
    const trip = await Trip.findByPk(id);

    const updateKms = trip?.dataValues.kms! - aTrip.kms;

    await VehicleServices.loadMileage(aTrip.id, updateKms);
  }

  const [result] = await Trip.update(aTrip, { where: { id } });
  return { success: result > 0 };
};

const destroy = async (id: string) => {
  const [result] = await Trip.update({ isCanceled: true }, { where: { id } });
  return { success: result > 0 };
};

const drivenKmsByID = async (id: number) => {
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
