import { Application } from "express";

import indexRoute from "./index.route";
import userRoute from "./user.route";

export const routes = (app: Application) => {
	app.use([userRoute, indexRoute]);
};
