import express from "express";
import { createOrder, getSingleOrder, getOrderLocation, getUserOrders, updateOrderStatus,  getAllOrdersAdmin } from "../Controllers/orderController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const orderRouter=express.Router();

orderRouter.post("/",auth,createOrder);
orderRouter.get("/all",auth,admin,getAllOrdersAdmin);
orderRouter.get("/:id/location",auth,getOrderLocation);
orderRouter.get("/:id",auth,getSingleOrder);
orderRouter.put("/:id/status",auth,admin,updateOrderStatus);
orderRouter.get("/",auth,getUserOrders);

export default orderRouter;