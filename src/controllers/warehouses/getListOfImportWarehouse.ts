import {Request, Response} from 'express';
import {FilterQuery} from 'mongoose';
import ImportWarehouse, {
	ImportWarehouseDocument,
} from '../../models/ImportWarehouse';
import Supplier, {SupplierDocument} from '../../models/Supplier';

export const getListOfImportWarehouse = async (
	req: Request,
	res: Response,
): Promise<unknown> => {
	const {supplierId, page, limit, type} = req.query;
	try {
		const aggregate = [];
		let totalPage = 1,
			currentPage = 1,
			totalProduct = 0;
		const counterQuery: FilterQuery<ImportWarehouseDocument> = {};
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
		if (page && limit && type !== 'last-month' && type !== 'last-week') {
			totalProduct = await ImportWarehouse.countDocuments(counterQuery);
			totalPage = Math.ceil(totalProduct / parseInt(`${limit}`, 10));
			aggregate.push({
				$skip: parseInt(`${page}`, 10) * parseInt(`${limit}`, 10),
			});
			aggregate.push({
				$limit: parseInt(`${limit}`, 10),
			});
			currentPage = parseInt(`${page}`, 10);
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
		if (type === 'last-month') {
			aggregate.push({
				$match: {
					time: {
						$gte: new Date(
							new Date().getFullYear(),
							new Date().getMonth() - 1,
							1,
						).getTime(),
					},
				},
			});
			// group by product
			aggregate.push({
				$group: {
					_id: '$product',
					amount: {$sum: '$amount'},
					productName: {$first: '$name'},
					supplierName: {$first: '$supplier.name'},
					supplierId: {$first: '$supplier._id'},
				},
			});
		} else if (type === 'last-week') {
			aggregate.push({
				$match: {
					time: {
						$gte: new Date(
							new Date().getTime() - new Date().getDay() * 24 * 60 * 60 * 1000,
						).getTime(),
					},
				},
			});
			// group by product
			aggregate.push({
				$group: {
					_id: '$product',
					amount: {$sum: '$amount'},
					productName: {$first: '$name'},
					supplierName: {$first: '$supplier.name'},
					supplierId: {$first: '$supplier._id'},
				},
			});
		}
		if (type === 'last-month' || type === 'last-week') {
			const importWarehouses = await ImportWarehouse.aggregate(aggregate);
			return res.status(200).json({
				message: 'Get list of import warehouse successfully',
				products: importWarehouses,
			});
		} else {
			const importWarehouses = await ImportWarehouse.aggregate(aggregate);
			return res.status(200).json({
				message: 'Get list of import warehouse successfully',
				products: importWarehouses,
				totalPage,
				page: currentPage,
				totalProduct,
			});
		}
	} catch (error) {
		return res.status(500).json({error});
	}
};
