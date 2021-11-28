import express from 'express';
import authenticationRoute from './authentication';
import privateRoute from './private';
import productsRouter from './products';
import suppliersRouter from './suppliers';
import warehouseRoute from './warehouses';

const route = express.Router();

route.use('/authentication', authenticationRoute);
route.use('/private', privateRoute);
route.use('/suppliers', suppliersRouter);
route.use('/products', productsRouter);
route.use('/warehouses', warehouseRoute);

export default route;
