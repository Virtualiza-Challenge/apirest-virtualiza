export interface DriverAttributes {
  id: number;
  name: string;
  surname: string;
  dni: string;
  license: string;
  license_type: LicenseType;
  emision_date: Date | string;
  able_to_drive: boolean;
  isActive: boolean;
  wage_month?: number;
  driven_kms?: number;
}

export type LicenseType = "Professional" | "Personal";
