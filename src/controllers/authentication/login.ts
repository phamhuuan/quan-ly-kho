import bcrypt from 'bcryptjs';
import {Request, Response} from 'express';
import User, {UserDocument} from '../../models/User';
import {generateTokens} from './../../helpers/generateToken';

export const login = async (req: Request, res: Response): Promise<unknown> => {
	const {email = '', password = ''} = req.body;
	try {
		// check input value
		if (email === '' || password === '') {
			return res.status(400).json({
				message: 'Please provide email and password',
			});
		}

		const user: UserDocument | null = await User.findOne({
			email,
		});
		if (user) {
			// check password
			const isMatch: boolean = await bcrypt.compare(password, user.password);
			if (isMatch) {
				const tokens = generateTokens({
					userId: user._id,
				});

				// push tokens.accessToken to user.token
				user.token.push(tokens.accessToken);
				await user.save();

				return res.json({
					message: 'Login success',
					user: {
						_id: user._id,
						email: user.email,
						avatar: user.avatar,
					},
					token: tokens.accessToken,
				});
			} else {
				return res.status(403).json({
					message: 'Wrong password',
				});
			}
		} else {
			return res.status(404).json({
				message: 'User not found',
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
