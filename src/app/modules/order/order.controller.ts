/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderValidationSchema } from "./order.validaton";
import { OrderService } from "./order.service";

// Create order
const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;

  try {
    const zodValidationData = orderValidationSchema.parse(orderData);
    const result = (await OrderService.createOrderIntoDB(
      zodValidationData,
    )) as any
    console.log(result);
    if (result?.success === false) {
      res.send(result);
    }
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something Error",
      error: error,
    });
  }
};
// get order
const getOrder = async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    if (email) {
      const result = await OrderService.getSingleOrderFromDB(email);
      console.log(result);
      if (result !== null) {
        res.status(200).json({
          success: true,
          message: " Orders fetched successfully for user email!",
          data: result,
        });
      }
      res.status(200).json({
        success: false,
        message: "Order not found",
      });
    } else {
      const result = await OrderService.getOrderFromDB();
      if (result !== null) {
        res.status(200).json({
          success: true,
          message: "Orders fetched successfully!",
          data: result,
        });
      }
      res.status(200).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something Error",
      error: error,
    });
  }
};
export const OrderController = {
  createOrder,
  getOrder,
};
