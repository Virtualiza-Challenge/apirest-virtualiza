import { DataTypes } from "sequelize";
import { Driver } from "./Driver";
import { Vehicle } from "./Vehicle";
import sequelize from "../../infraestructure/database";

export const Trip = sequelize.define(
  "trips",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    hour: {
      type: DataTypes.INTEGER,
    },
    minutes: {
      type: DataTypes.INTEGER,
    },
    kms: {
      type: DataTypes.INTEGER,
    },
    isCanceled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

// 1:M
Driver.hasMany(Trip, { foreignKey: "driver_id" });
Trip.belongsTo(Driver, { foreignKey: "driver_id" });

Vehicle.hasMany(Trip, { foreignKey: "vehicle_id" });
Trip.belongsTo(Vehicle, { foreignKey: "vehicle_id" });
