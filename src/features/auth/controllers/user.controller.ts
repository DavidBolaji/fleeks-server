import Logger from "bunyan";
import { Request, Response } from "express";
import { joiValidation } from "src/decorator";
import createLoggerCustom from "src/utils/logger";
import { signupSchema } from "../schema/signup.schema";
import { userQueue } from "src/services/queues/user.queue";
import { userService } from "../services/user.services";
import HTTP_STATUS from "http-status-codes";
import { ObjectId } from "mongodb";
import { Helpers } from "src/utils/helpers";
import { userCache } from "src/services/redis/user.cache";
import jwt from "jsonwebtoken";
import { signinSchema } from "../schema/signin.schema";
import { forgotSchema } from "../schema/forgot.schema";
import crypto from "crypto";
import { forgotPasswordTemplate } from "src/services/emails/template/forgot-password/forgot-password";
import { emailQueue } from "src/services/queues/email.queue";
import { compare } from "bcryptjs";
import { resetPasswordTemplate } from "src/services/emails/template/reset-password/reset-password";
import { resetSchema } from "../schema/reset.schema";

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

    const passwordMatch: boolean = await compare(
      req.body.password,
      user[0].password
    );

    console.log(passwordMatch);

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

    const resetLink = `${process.env.FRONT_END_URL}/reset/${randomToStrings}`;
    const body: string = forgotPasswordTemplate.passwordResetTemplate(
      req.body.email,
      resetLink
    );

    emailQueue.addEmailJob("forgotPasswordEmail", {
      rEmail: req.body.email,
      subject: "Reset your password",
      body,
    });

    res.status(HTTP_STATUS.OK).json({ message: "Password reset email sent" });
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

    const body: string = resetPasswordTemplate.passwordResetTemplate(
      userExists[0].email!
    );

    emailQueue.addEmailJob("resetPasswordEmail", {
      rEmail: userExists[0].email!,
      subject: "Password Reset Confirmation",
      body,
    });

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
