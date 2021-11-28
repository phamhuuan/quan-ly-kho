/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Request, Response} from 'express';
import Product from '../../models/Product';

export const getProduct = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {id} = req.params;
	try {
		const product = await Product.findById(id).populate('supplier');
		if (!product) {
			return res.status(404).json({
				message: 'Product not found',
			});
		}
		return res.status(200).json({
			message: 'Get product successfully',
			product: {
				_id: product._id,
				name: product.name,
				// @ts-ignore
				supplierId: product.supplier._id,
				// @ts-ignore
				supplierName: product.supplier.name,
				amount: product.amount,
			},
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
