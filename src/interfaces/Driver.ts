export interface DriverProps {
  name: string;
  surname: string;
  dni: string;
  license_type: LicenseType;
  emision_date: string;
}

export type LicenseType = "Professional" | "Personal";
