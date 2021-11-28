import {Request, Response} from 'express';
import User, {UserDocument} from '../../models/User';

export const checkToken = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {userId} = req.body;
	try {
		const user: UserDocument | null = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}
		return res.status(200).json({
			message: 'Token is valid',
			user,
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
