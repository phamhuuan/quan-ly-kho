import express from 'express';
import {createAccount} from '../controllers/private/createAccount';

const privateRoute = express.Router();

privateRoute.post('/create_account', createAccount);

export default privateRoute;
