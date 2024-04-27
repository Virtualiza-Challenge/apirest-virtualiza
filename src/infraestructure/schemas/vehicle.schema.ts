import { z } from "zod";

export const VehicleInsertSchema = z.object({
  plate: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number(),
});

export const VehicleUpdateSchema = z.object({
  plate: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
});
