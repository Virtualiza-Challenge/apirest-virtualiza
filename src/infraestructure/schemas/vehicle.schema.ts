import { z } from "zod";

export const DriverInsertSchema = z.object({
  plate: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number(),
});

export const DriverUpdateSchemaBase = z.object({
  plate: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
});
