import bcrypt from 'bcryptjs';
import {Request, Response} from 'express';
import User, {UserDocument} from '../../models/User';

export const createAccount = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {email = '', password = ''} = req.body;

	try {
		// check input value
		if (email === '' || password === '') {
			return res.status(400).json({
				message: 'Please enter email and password',
			});
		}

		const user: UserDocument | null = await User.findOne({email});

		if (user) {
			return res.status(400).json({
				message: 'User already exists',
			});
		} else {
			const encryptedPassword = await bcrypt.hash(password, 15);
			const newUser: UserDocument = new User({
				email,
				password: encryptedPassword,
			});
			await newUser.save();

			return res.status(201).json({
				message: 'User created successfully',
			});
		}
	} catch (error) {
		return res.status(500).json({error});
	}
};
