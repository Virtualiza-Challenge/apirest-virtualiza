export interface TripAttributes {
  id: number;
  date: Date | string;
  hour: number;
  minutes: number;
  kms: number;
  isCanceled: boolean;
  driver_id?: number;
  vehicle_id?: number;
}
