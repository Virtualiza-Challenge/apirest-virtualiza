import { DataTypes, Model } from "sequelize";
import sequelize from "../../infraestructure/database";
import { VehicleAttributes } from "../../interfaces/Vehicle";

export const Vehicle = sequelize.define<Model<VehicleAttributes>>(
  "vehicles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plate: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    kms: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);
