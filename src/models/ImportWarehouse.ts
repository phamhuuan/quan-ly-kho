import {Document, Model, model, Schema, Types} from 'mongoose';

export interface ImportWarehouse {
	product: Types.ObjectId;
	amount: number;
	supplier: Types.ObjectId;
	time: number;
}

export interface ImportWarehouseDocument extends ImportWarehouse, Document {}

export type ImportWarehouseModel = Model<ImportWarehouseDocument>;

const ImportWarehouseSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	supplier: {
		type: Schema.Types.ObjectId,
		ref: 'Supplier',
		required: true,
	},
	time: {
		type: Number,
		required: true,
	},
});

export default model<ImportWarehouseDocument, ImportWarehouseModel>(
	'ImportWarehouse',
	ImportWarehouseSchema,
);
