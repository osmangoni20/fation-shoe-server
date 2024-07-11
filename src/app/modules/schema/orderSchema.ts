import { model, Schema } from "mongoose";
import { TProductOrder } from "../order/order.interface";

export const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    ref: "Product",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const OrderModel = model<TProductOrder>("Order", orderSchema);
