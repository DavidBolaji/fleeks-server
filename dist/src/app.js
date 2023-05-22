"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const setupServer_1 = require("./setupServer");
const mongoose_1 = __importDefault(require("./db/mongoose"));
const cloudinary_1 = require("./utils/cloudinary");
//imitialize expresss server
const app = (0, express_1.default)();
// initialize database connection
(0, mongoose_1.default)();
//initialize cloudinary
(0, cloudinary_1.loadCloudinary)();
//start server
const start = new setupServer_1.FavServer(app);
start.start();
//# sourceMappingURL=app.js.map