import express from 'express';
import {createSupplier} from '../controllers/suppliers/createSupplier';
import {deleteSupplier} from '../controllers/suppliers/deleteSupplier';
import {getListOfSuppliers} from '../controllers/suppliers/getListOfSuppliers';
import {getSupplier} from '../controllers/suppliers/getSupplier';
import {updateSupplier} from '../controllers/suppliers/updateSupplier';
import {verifyToken} from '../middlewares/verifyToken';

const suppliersRouter = express.Router();

suppliersRouter
	.post('/', verifyToken, createSupplier)
	.get('/', verifyToken, getListOfSuppliers)
	.get('/:id', verifyToken, getSupplier)
	.put('/:id', verifyToken, updateSupplier)
	.delete('/:id', verifyToken, deleteSupplier);

export default suppliersRouter;
