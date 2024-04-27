import { Request, Response, NextFunction } from "express";
import { jsonResponse } from "../../helpers/jsonResponse";

export const handlerError = async (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("Ha ocurrido un error ", error.message);
  res.status(500).json(jsonResponse({ error: true, message: error.message }));
};
