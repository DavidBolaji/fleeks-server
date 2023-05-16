import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { FavServer } from "./setupServer";
import dbCon from "./db/mongoose";
import { loadCloudinary } from "./utils/cloudinary";

//imitialize expresss server
const app: Express = express();
// initialize database connection
dbCon();
//initialize cloudinary
loadCloudinary();
//start server
const start = new FavServer(app);
start.start();
