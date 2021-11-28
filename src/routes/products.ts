import express from 'express';
import {createProduct} from '../controllers/products/createProduct';
import {deleteProduct} from '../controllers/products/deleteProduct';
import {getListOfProducts} from '../controllers/products/getListOfProducts';
import {getProduct} from '../controllers/products/getProduct';
import {updateProduct} from '../controllers/products/updateProduct';
import {verifyToken} from '../middlewares/verifyToken';

const productsRouter = express.Router();

productsRouter
	.post('/', verifyToken, createProduct)
	.get('/', verifyToken, getListOfProducts)
	.get('/:id', verifyToken, getProduct)
	.patch('/:id', verifyToken, updateProduct)
	.delete('/:id', verifyToken, deleteProduct);

export default productsRouter;
