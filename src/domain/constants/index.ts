export const WAHE_MONTH = 100;

// Obtener la fecha actual
export const CURRENT_DATE = new Date();

// Obtener el primer día del mes actual
export const FIRST_DAY_OF_MONTH = new Date(
  CURRENT_DATE.getFullYear(),
  CURRENT_DATE.getMonth(),
  1
);

// Obtener el último día del mes actual
export const LAST_DAY_OF_MONTH = new Date(
  CURRENT_DATE.getFullYear(),
  CURRENT_DATE.getMonth() + 1,
  0
);

export const RESET_KMS_VEHICLE = 0;
export const SERVICE_MILEAGE = 15000;
