import {Document, Model, model, Schema} from 'mongoose';

export interface User {
	email: string;
	password: string;
	avatar?: string;
	token: string[];
}

export interface UserDocument extends User, Document {}

export type UserModel = Model<UserDocument>;

const UserSchema = new Schema<UserDocument, UserModel>({
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	avatar: {
		type: String,
	},
	token: [
		{
			type: String,
		},
	],
});

export default model<UserDocument, UserModel>('User', UserSchema);
