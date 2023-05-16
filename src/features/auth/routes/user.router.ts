import express, { Router } from "express";
import { UserController } from "../controllers/user.controller";

const authRouter: Router = express.Router();

authRouter.post("/signup", UserController.prototype.signup);
authRouter.post("/signin", UserController.prototype.signin);

export default authRouter;
