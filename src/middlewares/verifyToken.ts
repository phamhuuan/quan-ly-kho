import {NextFunction, Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import User from '../models/User';

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<unknown> => {
	const {authorization} = req.headers;
	const token = authorization && authorization.split(' ')[1];
	if (!token) {
		return res.sendStatus(401);
	}
	try {
		const decoded: JwtPayload | string = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET || '',
		);
		if (typeof decoded === 'string') {
			return res.sendStatus(401);
		}
		const user = await User.findOne({token});
		if (!user) {
			return res.sendStatus(401);
		}
		req.body.userId = decoded.userId;
		req.body.token = token;
		next();
	} catch (error) {
		return res.sendStatus(401);
	}
};
