import express from "express";
import { createProduct, OutofOrderProduct, getFlashDeals, getProductById, getProducts, updateProduct } from "../Controllers/productController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const productRouter=express.Router();

productRouter.get("/flash-deals",getFlashDeals);
productRouter.get("/",getProducts);
productRouter.get("/:id",getProductById);
productRouter.post("/",auth,admin,createProduct);
productRouter.put("/:id",auth,admin,updateProduct);
productRouter.patch("/:id",auth,admin,OutofOrderProduct);

export default productRouter;