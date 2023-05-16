import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserDocument } from "src/features/auth/interfaces/user.interface";
import { UserModel } from "src/features/auth/models/user.model";
import { NotAuthorizedError } from "src/utils/error/error-handler";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) throw new NotAuthorizedError("User not authorized");
  const secret: any = process.env.SECRET;
  try {
    const userId = jwt.verify(req.session?.jwt, secret);
    const user = (await UserModel.findById(userId)) as unknown as IUserDocument;
    req.user = user;
  } catch (err) {
    throw new NotAuthorizedError("User not authorized");
  }
  next();
};
