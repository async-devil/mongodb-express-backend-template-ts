import express, { Application } from "express";

import { routes } from "./routes/routes";
import "./db/mongoose";

export const app: Application = express();
app.use(express.json());

routes(app);
