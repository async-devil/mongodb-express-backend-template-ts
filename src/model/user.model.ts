/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import mongoose, { Schema, Document, Date, ObjectId } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
	name: string;
	email: string;
	age: number;
	password: string | undefined;
	tokens:
		| {
				token: string;
				_id: string;
		  }[]
		| undefined;
	createdAt: Date;
	updatedAt: Date;
	_id: ObjectId;
}

const UserSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
			validate(value: string) {
				if (!validator.isEmail(value)) throw new Error("Invalid email");
			},
		},
		age: {
			type: Number,
			validate(value: number) {
				if (value < 0) throw new Error("Age can't be negative");
			},
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 72,
			validate(value: string) {
				const strongPassword = new RegExp(
					"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
				);
				if (!strongPassword.test(value)) throw new Error("Password is too weak");
			},
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", async function (this: IUser, next) {
	const user = this;

	if (user.isModified("password")) user.password = await bcrypt.hash(user.password as string, 8);
	next();
});

UserSchema.methods.toJSON = function (this: IUser) {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

export default mongoose.model<IUser>("User", UserSchema);
