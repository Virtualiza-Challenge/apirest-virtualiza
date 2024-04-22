export interface DriverProps {
  name: string;
  surname: string;
  dni: string;
  license: string;
  license_type: "Professional" | "Personal";
  emision_date: Date;
  able_to_drive: boolean;
}
