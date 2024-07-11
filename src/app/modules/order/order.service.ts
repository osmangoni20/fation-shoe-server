import { ObjectId } from "mongodb";
import { OrderModel } from "../schema/orderSchema";
import { ProductModel } from "../schema/productSchema";
import { TProductOrder } from "./order.interface";

// Checking Product From Database
const CheckProductFromDB = async (orderData: TProductOrder) => {
  const product = await ProductModel.findOne({
    _id: new ObjectId(orderData.productId),
  });
  if (product !== null) {
    if (product.inventory.quantity >= orderData.quantity) {
      const result = await OrderModel.create(orderData);
      const updateQuantity = product.inventory.quantity - orderData.quantity;

      await ProductModel.updateOne(
        { _id: new ObjectId(orderData.productId) },
        { $set: { inventory: { quantity: updateQuantity, inStock: true } } },
      );
      return result;
    } else if (product.inventory.quantity === 0) {
      await ProductModel.updateOne(
        { _id: new ObjectId(orderData.productId) },
        { $set: { inventory: { inStock: false, quantity: 0 } } },
      );
      return {
        success: false,
        message: "Insufficient quantity available in inventory",
      };
    }
  }
  return {
    success: false,
    message: "Product not found",
  };
};
// Create Order
const createOrderIntoDB = async (orderData: TProductOrder) => {
  const result = await CheckProductFromDB(orderData);
  return result;
};
// Get All Order From Database
const getOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// Single Order 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSingleOrderFromDB = async (email: any) => {
  const result = await OrderModel.findOne({ email: email });
  return result
};
export const OrderService = {
  createOrderIntoDB,
  getOrderFromDB,
  getSingleOrderFromDB,
};
