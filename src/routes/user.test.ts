import request from "supertest";

import { app } from "../app";
import { IUser } from "../model/user.model";

describe("Test user route", () => {
	it("Should create, get and delete user", async () => {
		const createdUser = await request(app).put("/user").send({
			name: "Test",
			age: 27,
			email: "test@example.com",
			password: "Pd75i9usbr?@0",
		});

		const createdUserData = createdUser.body as IUser;
		expect(createdUserData.name).toBe("Test");

		const existingUser = await request(app).get(`/user/${createdUserData._id.toString()}`).send();
		const existingUserData = existingUser.body as IUser;
		expect(existingUserData.name).toBe("Test");

		const deletedUser = await request(app).delete(`/user/${createdUserData._id.toString()}`).send();
		expect(deletedUser.status).toBe(200);
	});
});
