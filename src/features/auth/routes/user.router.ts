import express, { Router } from "express";
import { UserController } from "../controllers/user.controller";

const authRouter: Router = express.Router();

authRouter.post("/signup", UserController.prototype.signup);
authRouter.post("/signin", UserController.prototype.signin);
authRouter.get("/signout", UserController.prototype.signout);
authRouter.post("/forgot", UserController.prototype.forgot);
authRouter.post("/token", UserController.prototype.token);
authRouter.post("/reset", UserController.prototype.reset);

export default authRouter;
