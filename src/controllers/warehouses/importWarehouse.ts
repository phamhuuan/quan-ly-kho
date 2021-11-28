import {Request, Response} from 'express';
import ImportWarehouse from '../../models/ImportWarehouse';
import Product from '../../models/Product';
import Supplier from '../../models/Supplier';

export const importWarehouse = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {productId, supplierId, amount} = req.body;
	try {
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({
				message: 'Product not found',
			});
		}
		const supplier = await Supplier.findById(supplierId);
		if (!supplier) {
			return res.status(404).json({
				message: 'Supplier not found',
			});
		}
		const importWarehouse = await ImportWarehouse.create({
			product: productId,
			supplier: supplierId,
			amount,
			time: Date.now(),
		});
		return res.status(201).json({
			message: 'Import warehouse successfully',
			importInformation: {
				_id: importWarehouse._id,
				productName: product.name,
				supplierName: supplier.name,
				productId: product._id,
				supplierId: supplier._id,
				amount,
			},
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
