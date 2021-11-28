import {Document, Model, model, Schema, Types} from 'mongoose';

export interface ExportWarehouse {
	product: Types.ObjectId;
	amount: number;
	supplier: Types.ObjectId;
	time: number;
}

export interface ExportWarehouseDocument extends ExportWarehouse, Document {}

export type ExportWarehouseModel = Model<ExportWarehouseDocument>;

const ExportWarehouseSchema = new Schema({
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

export default model<ExportWarehouseDocument, ExportWarehouseModel>(
	'ExportWarehouse',
	ExportWarehouseSchema,
);
