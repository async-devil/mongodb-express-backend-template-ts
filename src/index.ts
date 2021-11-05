import "dotenv/config";
import chalk from "chalk";

import { app } from "./app";

const port = process.env.PORT || 3000;

console.log(
	chalk`{yellow.bold [?]} {whiteBright App running in} {cyanBright ${
		process.env.NODE_ENV || "development"
	}} {whiteBright mode}`
);

app.listen(port, () =>
	console.log(
		chalk`{greenBright.bold [✓]} {whiteBright Server running at} {cyanBright http://localhost:${port}}`
	)
);
