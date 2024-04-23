import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import { randomBytes } from "crypto";

export const Driver = sequelize.define(
  "drivers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
    license: {
      type: DataTypes.STRING,
      defaultValue: randomBytes(16).toString("hex"),
    },
    license_type: {
      type: DataTypes.ENUM("Pofessional", "Personal"),
      defaultValue: "Pofessional",
    },
    emision_date: {
      type: DataTypes.DATEONLY,
    },
    able_to_drive: {
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
