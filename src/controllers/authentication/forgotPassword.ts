import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {Request, Response} from 'express';
import nodemailer from 'nodemailer';
import User, {UserDocument} from '../../models/User';

dotenv.config();

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	// port: 444,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.EMAIL, // generated ethereal user
		pass: process.env.EMAIL_PASSWORD, // generated ethereal password
	},
});
export const forgotPassword = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {email = ''} = req.body;
	try {
		if (email === '') {
			return res.status(400).json({
				message: 'Please provide email',
			});
		}
		const user: UserDocument | null = await User.findOne({email});
		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}
		// send email
		const newPassword = Math.random().toString(36).slice(-8);
		// hash password
		const hashedPassword = await bcrypt.hash(newPassword, 15);
		// update password
		user.password = hashedPassword;
		// await user.save();
		// send email in japanese
		const mailOptions = {
			from: process.env.EMAIL, // sender address
			to: email, // list of receivers
			subject: 'パスワード再設定', // Subject line
			html: `
				<h3>パスワード再設定</h3>
				<p>あなたの新しいパスワードは<b>${newPassword}</b>です。</p>
			`,
		};
		transporter.sendMail(mailOptions);
		return res.json({
			message: 'Email sent',
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
