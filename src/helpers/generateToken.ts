import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateTokens = (
	payload: Record<string, unknown>,
): {accessToken: string} => {
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', {
		expiresIn: '1y',
	});

	return {accessToken};
};
