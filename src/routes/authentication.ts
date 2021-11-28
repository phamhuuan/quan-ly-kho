import express from 'express';
import {changePassword} from '../controllers/authentication/changePassword';
import {checkToken} from '../controllers/authentication/checkToken';
import {forgotPassword} from '../controllers/authentication/forgotPassword';
import {login} from '../controllers/authentication/login';
import {logout} from '../controllers/authentication/logout';
import {verifyToken} from '../middlewares/verifyToken';

const authenticationRoute = express.Router();

authenticationRoute.post('/login', login);

authenticationRoute.delete('/logout', verifyToken, logout);

authenticationRoute.put('/change-password', verifyToken, changePassword);

authenticationRoute.post('/forgot-password', forgotPassword);

authenticationRoute.get('/check-token', verifyToken, checkToken);

export default authenticationRoute;
