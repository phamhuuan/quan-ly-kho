import {Request, Response} from 'express';
import ExportWarehouse from '../../models/ExportWarehouse';
import Product from '../../models/Product';
import Supplier, {SupplierDocument} from '../../models/Supplier';

export const deleteSupplier = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {id} = req.params;
	try {
		const supplier: SupplierDocument | null = await Supplier.findByIdAndUpdate(
			id,
			{deleted: true},
		);
		if (!supplier) {
			return res.status(404).json({
				message: 'Supplier not found',
			});
		}
		const products = await Product.find({supplier: id});
		await Product.updateMany({supplier: id}, {amount: 0}, {new: true});
		const now = Date.now();
		await ExportWarehouse.insertMany(
			products.map(product => ({
				product: product._id,
				supplier: supplier._id,
				amount: product.amount,
				time: now,
			})),
		);
		return res.status(200).json({
			message: 'Delete supplier successfully',
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
