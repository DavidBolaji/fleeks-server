import { Application, NextFunction, Request, Response } from "express";
import { customError } from "./error-handler";
import HTTP_STATUS from "http-status-codes";
import "express-async-errors";

export interface IErrorResponse {
  message: string;
  statusCode: number;
  ststus: string;
  serializeErrors(): string;
}

export const globalErrorHandler = (app: Application) => {
  app.all("*", (req: Request, res: Response) => {
    res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: `${req.originalUrl} not found` });
  });

  app.use(
    (
      error: IErrorResponse,
      _req: Request,
      res: Response,
      next: NextFunction
    ) => {
      console.log(error);
      if (error instanceof customError) {
        console.log("dheeu");
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    }
  );
};
