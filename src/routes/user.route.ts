import { Request, Response, Router } from "express";

import User, { IUser } from "../model/user.model";

const router = Router();

router.put("/user", async (req: Request, res: Response) => {
	const user = new User({ ...req.body } as IUser);
	await user.save();

	return res.send(user);
});

router.get("/user/:id", async (req: Request, res: Response) => {
	const user: IUser | null = await User.findById(req.params.id);
	if (!user) return res.status(404);

	return res.send(user);
});

router.delete("/user/:id", async (req: Request, res: Response) => {
	const user: IUser | null = await User.findById(req.params.id);
	if (!user) return res.status(404).send();

	await user.remove();
	return res.status(200).send();
});

export default router;
