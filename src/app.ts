import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoute } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.router";
export const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoute);
app.use("/api/orders", OrderRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/*", function (req, res) {
  res.send("Route not found");
  res.end();
});
app.post("/*", function (req, res) {
  res.send("Route not found");
  res.end();
});
