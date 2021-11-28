import {Request, Response} from 'express';
import Supplier, {SupplierDocument} from '../../models/Supplier';

export const getSupplier = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {id} = req.params;
	try {
		const supplier: SupplierDocument | null = await Supplier.findById(id);
		if (!supplier) {
			return res.status(404).json({
				message: 'Supplier not found',
			});
		}
		return res.status(200).json({
			message: 'Get supplier successfully',
			supplier,
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
