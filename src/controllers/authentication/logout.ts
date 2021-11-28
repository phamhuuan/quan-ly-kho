import {Request, Response} from 'express';
import User from '../../models/User';

export const logout = async (req: Request, res: Response): Promise<unknown> => {
	const {userId, token} = req.body;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}
		user.token = user.token.filter(t => t !== token);
		await user.save();
		return res.status(200).json({
			message: 'Logout successfully',
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
