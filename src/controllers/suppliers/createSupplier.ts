import {Request, Response} from 'express';
import Supplier, {SupplierDocument} from '../../models/Supplier';

export const createSupplier = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {name = ''} = req.body;
	try {
		if (name === '') {
			return res.status(400).json({
				message: 'Please provide name',
			});
		}
		const supplier: SupplierDocument | null = await Supplier.findOne({name});
		if (supplier) {
			return res.status(409).json({
				message: 'Supplier already exists',
			});
		}
		const newSupplier: SupplierDocument = new Supplier({
			name,
		});
		await newSupplier.save();
		return res.status(201).json({
			message: 'Create supplier successfully',
			supplier: newSupplier,
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
