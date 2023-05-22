import Logger from "bunyan";
import { Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { compare } from "bcryptjs";
import { ObjectId } from "mongodb";

import createLoggerCustom from "../../../utils/logger";
import { signupSchema } from "../schema/signup.schema";
import { joiValidation } from "../../../decorator/decorator";
import { signinSchema } from "../schema/signin.schema";
import { userService } from "../services/user.services";

import { forgotSchema } from "../schema/forgot.schema";

import { forgotPasswordTemplate } from "../../../services/emails/template/forgot-password/forgot-password";
import { emailQueue } from "../../../services/queues/email.queue";
import { resetSchema } from "../schema/reset.schema";
import { resetPasswordTemplate } from "../../../services/emails/template/reset-password/reset-password";
import { Helpers } from "../../../utils/helpers";
import { userCache } from "../../../services/redis/user.cache";
import { userQueue } from "../../../services/queues/user.queue";
import { mailTransport } from "../../../services/emails/mail.transport";

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
    const value = { _id, uId, ...req.body };
    // await userCache.saveUserToCache(_id, uId, { _id, ...req.body });

    //start worker to save user in db
    // userQueue.addUserJob("addUserToDB", { value: { _id, uId, ...req.body } });

    await userService.createUser(value);

    const token: string = UserController.prototype.signupToken(_id);
    req.session = { jwt: token };

    //send result
    res.status(HTTP_STATUS.CREATED).json({
      message: "User created successfully",
      data: { _id, uId, ...req.body },
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

    const passwordMatch: boolean = await compare(
      req.body.password,
      user[0].password
    );

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
      data: { ...user[0]._doc },
    });
  }

  public async signout(req: Request, res: Response) {
    req.session = null;

    res.status(HTTP_STATUS.OK).json({
      message: "Signout successfull",
      data: {},
    });
  }

  @joiValidation(forgotSchema)
  public async forgot(req: Request, res: Response) {
    const userExists = await userService.findOne(req.body.email);

    if (!userExists) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: "wrong email",
        statusCode: HTTP_STATUS.CONFLICT,
        status: "error",
      });
    }

    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomToStrings: string = randomBytes.toString("hex");

    await userService.setResetLink(
      req.body.email,
      randomToStrings,
      Date.now() * 60 * 60 * 1000
    );

    let origin: any = process.env.FRONT_END_URL_DEV;
    if (process.env.ENV === "prod") {
      origin = process.env.FRONT_END_URL_PROD;
    }

    const resetLink = `${origin}/reset/${randomToStrings}`;
    // const body: string = forgotPasswordTemplate.passwordResetTemplate(
    //   req.body.email,
    //   resetLink
    // );

    // await mailTransport.sendEmail(req.body.email, "Reset your password", body);

    // emailQueue.addEmailJob("forgotPasswordEmail", {
    //   rEmail: req.body.email,
    //   subject: "Reset your password",
    //   body,
    // });

    res.status(HTTP_STATUS.OK).json({
      message: "Password reset email sent",
      data: { link: resetLink },
    });
  }

  @joiValidation(resetSchema)
  public async reset(req: Request, res: Response) {
    const userExists = await userService.findOneByTokenAndExpiration(
      req.body.token
    );

    if (userExists.length < 1) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: "Token expired",
        statusCode: HTTP_STATUS.NOT_FOUND,
        status: "error",
      });
    }

    await userService.updatePassword(userExists[0]._id, req.body.password);

    // const body: string = resetPasswordTemplate.passwordResetTemplate(
    //   userExists[0].email!
    // );

    // emailQueue.addEmailJob("resetPasswordEmail", {
    //   rEmail: userExists[0].email!,
    //   subject: "Password Reset Confirmation",
    //   body,
    // });
    // await mailTransport.sendEmail(
    //   userExists[0].email!,
    //   "Password Reset Confirmation",
    //   body
    // );

    res.status(HTTP_STATUS.OK).json({ message: "Password change successfull" });
  }

  public async token(req: Request, res: Response) {
    const userExists = await userService.findOneByToken(req.body.token);

    if (!userExists) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: "Authentication failed",
        statusCode: HTTP_STATUS.NOT_FOUND,
        status: "error",
      });
    }

    res.status(HTTP_STATUS.OK).json({ message: "Authentication successfull" });
  }

  private signupToken(id: ObjectId): string {
    const token: any = process.env.SECRET;
    return jwt.sign({ _id: id.toString() }, token);
  }
}
