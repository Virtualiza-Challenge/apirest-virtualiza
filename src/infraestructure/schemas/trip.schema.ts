import { z } from "zod";

export const DriverInsertSchema = z.object({
  date: z.string(),
  hour: z.string(),
  minutes: z.string(),
  kms: z.number().positive(),
  driver_id: z.number(),
  vehicle_id: z.number(),
});

export const DriverUpdateSchemaBase = z.object({
  date: z.string().optional(),
  hour: z.string().optional(),
  minutes: z.string().optional(),
  kms: z.number().positive().optional(),
});
