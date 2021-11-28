import {Document, Model, model, Schema, Types} from 'mongoose';

export interface Product {
	name: string;
	supplier: Types.ObjectId;
	amount: number;
	deleted: boolean;
}

export interface ProductDocument extends Product, Document {}

export type ProductModel = Model<ProductDocument>;

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	supplier: {
		type: Schema.Types.ObjectId,
		ref: 'Supplier',
	},
	amount: {
		type: Number,
		required: true,
		default: 0,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
});

export default model<ProductDocument, ProductModel>('Product', ProductSchema);
