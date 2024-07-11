import { ObjectId } from "bson";
import { ProductModel } from "../schema/productSchema";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};
// get All product
const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
// get Single Product
const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.aggregate([
    {
      $match: { _id:{$eq:new ObjectId(productId)}},
    },
  ]);
  return result[0];
};

// update single Product
const updateSingleProductIntoDB = async (
  productId: string,
  updateData: TProduct,
) => {
  const result = await ProductModel.updateOne(
    {_id: new ObjectId(productId)  },
    {
      $set: { ...updateData },
    },
  );
  return result;
};

// searchProduct
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchSingleProductFromDB = async (searchTerm: any) => {
  // {$regex:searchTerm, $options:'i'}
  const result = await ProductModel.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  return result;
};
// delete single product
const deleteSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.updateOne(
    { _id: new ObjectId(productId)  },
    {
      $set: { isDeleted: true },
    },
  );
  return result;
};
export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  updateSingleProductIntoDB,
  searchSingleProductFromDB,
};
