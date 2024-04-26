import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { jsonResponse } from "../../helpers/jsonResponse";

export const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);

        const issues = error.issues.map((issue) => ({
          message: `${issue.code}:  ${issue.path} ➡️ ${issue.message}`,
        }));

        res
          .status(400)
          .json(
            jsonResponse({
              error: true,
              result: issues,
              message: "Schema validation!",
            })
          );
      }
      next(error);
    }
  };
