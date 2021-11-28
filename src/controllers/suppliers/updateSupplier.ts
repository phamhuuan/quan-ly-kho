import {Request, Response} from 'express';
import Supplier, {SupplierDocument} from '../../models/Supplier';

export const updateSupplier = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {name} = req.body;
	const {id} = req.params;
	try {
		if (name === '') {
			return res.status(400).json({
				message: 'Please provide name',
			});
		}
		const supplier: SupplierDocument | null = await Supplier.findByIdAndUpdate(
			id,
			{name},
			{new: true},
		);
		if (!supplier) {
			return res.status(404).json({
				message: 'Supplier not found',
			});
		}
		return res.status(200).json({
			message: 'Update supplier successfully',
			supplier,
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
