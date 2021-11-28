import {Request, Response} from 'express';
import {FilterQuery} from 'mongoose';
import Product, {ProductDocument} from '../../models/Product';
import Supplier, {SupplierDocument} from '../../models/Supplier';

export const getListOfProducts = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {supplierId, page, limit, max_amount} = req.query;
	try {
		const aggregate = [];
		let totalPage = 1,
			currentPage = 1,
			totalProduct = 0;
		const counterQuery: FilterQuery<ProductDocument> = {};
		if (supplierId) {
			const supplier: SupplierDocument | null = await Supplier.findById(
				supplierId,
			);
			if (!supplier) {
				return res.status(404).json({
					message: 'Supplier not found',
				});
			}
			counterQuery.supplier = supplier._id;
			aggregate.push({
				$match: {supplier: supplierId},
			});
		}
		if (max_amount) {
			counterQuery.amount = {$lte: parseInt(`${max_amount}`, 10)};
			aggregate.push({
				$match: {
					amount: {$lte: parseInt(`${max_amount}`, 10)},
				},
			});
		}
		if (page && limit) {
			totalProduct = await Product.countDocuments(counterQuery);
			totalPage = Math.ceil(totalProduct / parseInt(`${limit}`, 10));
			aggregate.push({
				$skip: parseInt(`${page}`, 10) * parseInt(`${limit}`, 10),
			});
			aggregate.push({
				$limit: parseInt(`${limit}`, 10),
			});
		}
		aggregate.push({
			$match: {
				deleted: false,
			},
		});
		aggregate.push({
			$lookup: {
				from: 'suppliers',
				localField: 'supplier',
				foreignField: '_id',
				as: 'supplier',
			},
		});
		aggregate.push({
			$unwind: '$supplier',
		});
		aggregate.push({
			$project: {
				_id: 1,
				name: 1,
				amount: 1,
				supplier: {
					_id: 1,
					name: 1,
				},
			},
		});
		const products = await Product.aggregate(aggregate);
		if (page && limit) {
			currentPage = parseInt(`${page}`, 10);
		}
		return res.status(200).json({
			message: 'Get list of products successfully',
			products: products.map(product => ({
				_id: product._id,
				name: product.name,
				supplierId: product.supplier._id,
				supplierName: product.supplier.name,
				amount: product.amount,
			})),
			totalPage,
			totalProduct,
			page: currentPage,
		});
	} catch (error) {
		return res.status(500).json({error});
	}
};
