import { Request, Response, NextFunction } from "express";
import { customError } from "../utils/customError";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  if (error instanceof customError) {
    return res.status(error.code).json({
      message: error.message,
    });
  } else {
    return res.status(500).json({
      message:
        "Internal Server Error, check your connection or try again later",
    });
  }
}