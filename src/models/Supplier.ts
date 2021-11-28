import {Document, Model, model, Schema} from 'mongoose';

export interface Supplier {
	name: string;
	deleted: boolean;
}

export interface SupplierDocument extends Supplier, Document {}

export type SupplierModel = Model<SupplierDocument>;

const SupplierSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

export default model<SupplierDocument, SupplierModel>(
	'Supplier',
	SupplierSchema,
);
