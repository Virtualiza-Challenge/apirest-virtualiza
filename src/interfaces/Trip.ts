export interface TripProps {
  date: Date;
  hour: number;
  minutes: number;
  kms: number;
  driver_id: number;
  vehicle_id: number;
}

export type TripUpdateProps = Omit<TripProps, "driver_id" | "vehicle_id">;
