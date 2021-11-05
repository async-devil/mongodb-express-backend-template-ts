import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).send("Hello there!");
	} catch (err) {
		next(err);
	}
});

export default router;
