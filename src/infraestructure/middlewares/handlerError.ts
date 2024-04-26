import { Request, Response, NextFunction } from "express";

export const handlerError = async (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("Ha ocurrido un error ", error.message);
  res
    .status(500)
    .json({ count: 0, result: null, error: true, message: error.message });
};
