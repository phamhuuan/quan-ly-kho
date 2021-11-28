import {Request, Response} from 'express';
import Product, {ProductDocument} from '../../models/Product';
import Supplier, {SupplierDocument} from '../../models/Supplier';

export const createProduct = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {name = '', supplierId = ''} = req.body;
	try {
		if (name === '' || supplierId === '') {
			return res.status(400).json({
				message: 'Please provide name and supplierId',
			});
		}
		const supplier: SupplierDocument | null = await Supplier.findById(
			supplierId,
		);
		if (!supplier) {
			return res.status(404).json({
				message: 'Supplier not found',
			});
		}
		const product: ProductDocument | null = await Product.findOne({
			name,
			supplier: supplier._id,
		});
		if (product) {
			return res.status(409).json({
				message: 'Product already exists',
			});
		}
		const newProduct = new Product({
			name,
			supplier: supplier._id,
		});
		await newProduct.save();
		return res.status(201).json({
			message: 'Created product successfully',
			product: {
				name: newProduct.name,
				supplierName: supplier.name,
				_id: newProduct._id,
				supplierId: supplier.name,
			},
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
