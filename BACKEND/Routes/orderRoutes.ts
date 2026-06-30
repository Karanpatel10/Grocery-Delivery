import express from "express";
import { createOrder, getSingleOrder, getOrderLocation, getUserOrders, updateOrderStatus,  getAllOrdersAdmin } from "../Controllers/orderController.js";

const orderRouter=express.Router();

orderRouter.post("/",createOrder);
orderRouter.get("/",getUserOrders);
orderRouter.get("/:id",getSingleOrder);
orderRouter.put("/:id/status",updateOrderStatus);
orderRouter.get("/all",getAllOrdersAdmin);
orderRouter.get("/:id/location",getOrderLocation);

export default orderRouter;