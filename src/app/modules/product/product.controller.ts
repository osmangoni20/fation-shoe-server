/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { ProductValidationSchema } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const validateData = ProductValidationSchema.parse(product);
    console.log(validateData);
    const result = await ProductService.createProductIntoDB(validateData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: "Something is Error",
      error: error.message,
    });
  }
};
// Get All Product
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result = await ProductService.searchSingleProductFromDB(searchTerm);
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } else {
      const result = await ProductService.getAllProductFromDB();

      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something Wrong",
      error: error.message,
    });
  }
};
// Get Single Product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result.length === 0 && null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something Wrong",
      error: error.message,
    });
  }
};

// Update Single Product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { product } = req.body;
    const result = await ProductService.updateSingleProductIntoDB(
      productId,
      product,
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something Wrong",
      error: error.message,
    });
  }
};

// Delete Single Product

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deleteSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something Wrong",
      error: error.message,
    });
  }
};
export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
