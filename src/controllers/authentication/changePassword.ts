import bcrypt from 'bcryptjs';
import {Request, Response} from 'express';
import User, {UserDocument} from '../../models/User';

export const changePassword = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {oldPassword, newPassword, userId} = req.body;
	try {
		if (oldPassword === '' || newPassword === '') {
			return res.status(400).json({
				message: 'Please provide old password and new password',
			});
		}
		// check password
		const user: UserDocument | null = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}
		const isMatch: boolean = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			return res.status(403).json({
				message: 'Wrong password',
			});
		}
		// update password
		const newEncryptedPassword = await bcrypt.hash(newPassword, 15);
		await User.findByIdAndUpdate(userId, {
			password: newEncryptedPassword,
		});
		return res.status(200).json({
			message: 'Change password successfully',
		});
	} catch (error) {
		return res.status(500).json({error, message: 'Internal server error'});
	}
};
