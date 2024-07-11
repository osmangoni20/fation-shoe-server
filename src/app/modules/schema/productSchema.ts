import mongoose, { model } from "mongoose";
import { TProduct } from "../product/product.interface";

const { Schema } = mongoose;
const variantSchema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

export const productSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
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
