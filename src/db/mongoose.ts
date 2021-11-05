import chalk from "chalk";
import mongoose from "mongoose";

const DB_ADRESS = `${process.env.DB_HOST || "mongodb://127.0.0.1:27017"}/${
	process.env.DB_NAME || ""
}`;

void mongoose
	.connect(DB_ADRESS, {})
	.then(() =>
		console.log(
			chalk`{greenBright.bold [✓]} {whiteBright Succsessfully connected to database at} {cyanBright ${DB_ADRESS}}`
		)
	)
	.catch((err: Error) =>
		console.log(
			chalk`{redBright.bold [✗] Error occurred while connecting to database:} {red ${err.message}}`
		)
	);
