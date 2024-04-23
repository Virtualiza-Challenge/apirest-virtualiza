import { LicenseType } from "../interfaces/Driver";

export const driverLicenseIsvalid = (
  emision_date: string,
  license_type: LicenseType
) => {
  const valid = license_type === "Professional" ? 1 : 5;
  const date = new Date(emision_date);

  const currentDate = new Date();

  // Calcula la diferencia en milisegundos
  const diff = currentDate.getTime() - date.getTime();

  // Calcula la diferencia en años
  const yearDiff = diff / (1000 * 60 * 60 * 24 * 365);

  return yearDiff < valid;
};
