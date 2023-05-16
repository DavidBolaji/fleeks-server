import Logger from "bunyan";
import { Request, Response } from "express";
import { joiValidation } from "src/decorator";
import createLoggerCustom from "src/utils/logger";
import { signupSchema } from "../schema/signup.schema";
import { userQueue } from "src/services/queues/user.queue";
import { userService } from "../services/user.services";
import HTTP_STATUS from "http-status-codes";
import { BadRequestError } from "src/utils/error/error-handler";
import { ObjectId } from "mongodb";
import { IUserDocument } from "../interfaces/user.interface";
import { Helpers } from "src/utils/helpers";
import { userCache } from "src/services/redis/user.cache";
import jwt from "jsonwebtoken";
import { signinSchema } from "../schema/signin.schema";

const log: Logger = createLoggerCustom("user.controller");

export class UserController {
  @joiValidation(signupSchema)
  public async signup(req: Request, res: Response) {
    // store in cache
    const userExists = await userService.findOne(req.body.email);

    if (userExists) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: "User already exists",
        statusCode: HTTP_STATUS.CONFLICT,
        status: "error",
      });
    }

    const _id = new ObjectId();
    const uId = String(Helpers.generateId());

    //save user in cache
    await userCache.saveUserToCache(_id, uId, { _id, ...req.body });

    //start worker to save user in db
    userQueue.addUserJob("addUserToDB", { value: { _id, uId, ...req.body } });

    const token: string = UserController.prototype.signupToken(_id);
    req.session = { jwt: token };
    //send result
    res.status(HTTP_STATUS.CREATED).json({
      message: "User created successfully",
      data: { _id, uId, ...req.body, token },
    });
  }

  @joiValidation(signinSchema)
  public async signin(req: Request, res: Response) {
    const user: any = await userService.findAndReturnUser(req.body.email);

    if (user.length < 1) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Wrong email or password",
        statusCode: HTTP_STATUS.CONFLICT,
        status: "error",
      });
    }

    const passwordMatch: boolean = user[0]?.comparePassword(req.body.password);

    if (!passwordMatch) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Wrong email or password",
        statusCode: HTTP_STATUS.CONFLICT,
        status: "error",
      });
    }

    const token: string = UserController.prototype.signupToken(user[0]._id);
    req.session = { jwt: token };

    res.status(HTTP_STATUS.OK).json({
      message: "Sign in successfull",
      data: { ...user[0]._doc, token },
    });
  }

  public async signout(req: Request, res: Response) {
    req.session = null;
    req.user = null;

    res.status(HTTP_STATUS.OK).json({
      message: "Signout successfull",
      data: {},
    });
  }

  private signupToken(id: ObjectId): string {
    const token: any = process.env.SECRET;
    return jwt.sign({ _id: id.toString() }, token);
  }
}
