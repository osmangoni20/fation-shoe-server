import mongoose, { model } from "mongoose";
import { TProduct } from "../product/product.interface";

const { Schema } = mongoose;
const variantSchema = new Schema({
  type: { type: String, required: [true, 'Type is required'] },
  value: { type: String, required: [true, 'Value is required'] },
});

const inventorySchema = new Schema({
  quantity: { type: Number, required: [true, 'Quantity is required'] },
  inStock: { type: Boolean, required: [true, 'InStock status is required'] },
});

export const productSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  category: { type: String, required: [true, 'Category is required'] },
  tags: { type: [String], required: [true, 'Tags are required'] },
  variants: { type: [variantSchema], required: [true, 'Variants are required'] },
  inventory: { type: inventorySchema, required: [true, 'Inventory is required'] },
  isDeleted: { type: Boolean },
});
productSchema.pre("save", function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const product = this;
  product.isDeleted = false;

  next();
});

productSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});
productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const ProductModel = model<TProduct>("Product", productSchema);
