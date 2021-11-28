import {Request, Response} from 'express';
import ExportWarehouse from '../../models/ExportWarehouse';
import Product, {ProductDocument} from '../../models/Product';

export const deleteProduct = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {id} = req.params;
	try {
		const product: ProductDocument | null = await Product.findByIdAndUpdate(
			id,
			{amount: 0, deleted: true},
		);
		if (!product) {
			return res.status(404).json({
				message: 'Product not found',
			});
		}
		await ExportWarehouse.create({
			Product: product.id,
			amount: product.amount,
			supplier: product.supplier,
			time: Date.now(),
		});
		return res.status(200).json({
			message: 'Delete product successfully',
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
