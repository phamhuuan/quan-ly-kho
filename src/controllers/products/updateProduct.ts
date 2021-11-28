import {Request, Response} from 'express';
import {UpdateQuery} from 'mongoose';
import ExportWarehouse from '../../models/ExportWarehouse';
import ImportWarehouse from '../../models/ImportWarehouse';
import Product, {ProductDocument} from '../../models/Product';
import Supplier, {SupplierDocument} from '../../models/Supplier';

export const updateProduct = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {name, supplierId} = req.body;
	const {id} = req.params;
	try {
		if (name === '' && supplierId === '') {
			return res.status(400).json({
				message: 'Please provide name or supplierId',
			});
		}
		const product: ProductDocument | null = await Product.findById(id);
		if (!product) {
			return res.status(404).json({
				message: 'Product not found',
			});
		}
		const updateQuery: UpdateQuery<ProductDocument> = {};
		if (supplierId) {
			const supplier: SupplierDocument | null = await Supplier.findById(
				supplierId,
			);
			if (!supplier) {
				return res.status(404).json({
					message: 'Supplier not found',
				});
			}
			updateQuery.supplier = supplier._id;
			const now = Date.now();
			await ExportWarehouse.create({
				product: product._id,
				supplier: product.supplier,
				amount: product.amount,
				time: now,
			});
			await ImportWarehouse.create({
				product: product._id,
				supplier: supplier._id,
				amount: product.amount,
				time: now,
			});
		}
		if (name) {
			updateQuery.name = name;
		}
		await Product.findByIdAndUpdate(id, updateQuery, {new: true});
	} catch (error) {
		return res.status(500).json({error});
	}
};
