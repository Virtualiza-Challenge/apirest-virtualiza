export interface DriverProps {
  name: string;
  surname: string;
  dni: string;
  license_type: "Professional" | "Personal";
  emision_date: string;
}
