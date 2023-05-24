import { NextFunction, Request, Response } from "express";
import { clearHash } from "../services/redis/experiment";

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  await next();

  clearHash(req!.user!.id);
};
