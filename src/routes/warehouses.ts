import express from 'express';
import {exportWarehouse} from '../controllers/warehouses/exportWarehouse';
import {getListOfExportWarehouse} from '../controllers/warehouses/getListOfExportWarehouse';
import {getListOfImportWarehouse} from '../controllers/warehouses/getListOfImportWarehouse';
import {importWarehouse} from '../controllers/warehouses/importWarehouse';
import {verifyToken} from '../middlewares/verifyToken';

const warehousesRouter = express.Router();

warehousesRouter
	.post('/import', verifyToken, importWarehouse)
	.get('/import', verifyToken, getListOfImportWarehouse);

warehousesRouter
	.post('/export', verifyToken, exportWarehouse)
	.get('/export', verifyToken, getListOfExportWarehouse);

export default warehousesRouter;
