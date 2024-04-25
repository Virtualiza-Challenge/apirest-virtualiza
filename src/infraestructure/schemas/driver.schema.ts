import { z } from "zod";

const LicenseType = ["Professional", "Personal"] as const;

export const DriverInsertSchema = z.object({
  name: z.string(),
  surname: z.string(),
  dni: z.string(),
  license: z.string(),
  license_type: z.enum(LicenseType),
  emision_date: z.union([z.date(), z.string()]),
});

export const DriverUpdateSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  dni: z.string().optional(),
  license: z.string().optional(),
  license_type: z.enum(LicenseType).optional(),
  emision_date: z.union([z.date(), z.string()]).optional(),
});
