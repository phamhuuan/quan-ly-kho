import {Request, Response} from 'express';
import Supplier, {SupplierDocument} from '../../models/Supplier';

export const getListOfSuppliers = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	try {
		const suppliers: SupplierDocument[] = await Supplier.find({
			deleted: false,
		});
		return res.status(200).json({
			message: 'Get list of suppliers successfully',
			suppliers,
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
