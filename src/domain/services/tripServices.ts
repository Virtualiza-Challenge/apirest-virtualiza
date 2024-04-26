import { Op } from "sequelize";
import { TripAttributes } from "../../interfaces/Trip";
import {
  FIRST_DAY_OF_MONTH,
  LAST_DAY_OF_MONTH,
  WAHE_MONTH,
} from "../constants";
import { Trip } from "../models";
import { DriverServices } from "./driverServices";
import { VehicleServices } from "./vehicleServices";
import { FilterAttibutes } from "../../helpers/applyFilters";
import sequelize from "../../infraestructure/database";

const getAll = async ({ offset, limit }: FilterAttibutes) => {
  return await Trip.findAll({
    attributes: { exclude: ["driver_id", "vehicle_id"] },
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
    limit,
  });
};

const getByID = async (id: string) => {
  return await Trip.findByPk(id, {
    attributes: { exclude: ["driver_id", "vehicle_id"] },
  });
};

const getByIDPopulate = async (id: string) => {
  return await Trip.findByPk(id, {
    attributes: { exclude: ["driver_id", "vehicle_id"] },
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
  });
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

const drivenKmsByDriverID = async (id: number) => {
  return await Trip.sum("kms", {
    where: {
      driver_id: id,
      date: {
        [Op.between]: [FIRST_DAY_OF_MONTH, LAST_DAY_OF_MONTH],
      },
    },
  });
};

const getDriversTopRanking = async ({ limit }: FilterAttibutes) => {
  return await Trip.findAll({
    where: {
      date: {
        [Op.between]: [FIRST_DAY_OF_MONTH, LAST_DAY_OF_MONTH],
      },
    },
    attributes: [
      [sequelize.fn("sum", sequelize.col("kms")), "driven_kms"], // Suma los kilómetros conducidos por cada conductor
      [sequelize.literal(`SUM(kms * ${WAHE_MONTH})`), "wage_month"], // Calcula el salario mensual basado en los kilómetros conducidos
    ],
    include: [
      {
        association: "driver",
        where: { isActive: true },
        attributes: [
          "id",
          "name",
          "surname",
          "dni",
          "license",
          "license_type",
          "emision_date",
          "able_to_drive",
        ],
      },
    ],
    group: ["driver_id"],
    order: [[sequelize.literal("driven_kms"), "DESC"]], // Ordena en orden descendente por los kilómetros conducidos
    limit,
  });
};

export const TripServices = {
  getAll,
  getByID,
  getByIDPopulate,
  create,
  update,
  destroy,
  drivenKmsByDriverID,
  getDriversTopRanking,
};
