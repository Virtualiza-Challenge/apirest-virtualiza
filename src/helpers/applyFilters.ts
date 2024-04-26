import { Request } from "express";

export interface FilterAttibutes {
  offset: number;
  limit: number | undefined;
}

export const applyFilters = (req: Request): FilterAttibutes => {
  const offset = Number(req.query._offset) || 0;
  const limit = req.query._limit ? Number(req.query._limit) : undefined;
  return { offset, limit };
};
