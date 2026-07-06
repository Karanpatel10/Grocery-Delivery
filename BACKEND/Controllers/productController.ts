import { Request, Response } from "express";
import { prisma } from "../Config/prisma.js";

// GET /api/products/flash-deals

export const getFlashDeals=async (req:Request,res:Response) => {
    const product=await prisma.product.findMany({where:{stock:{gt:0}},orderBy:{originalPrice:"desc"}});
    const productwithDiscount=product.map((p:any)=>{
        const discountPercentage=p.originalPrice && p.price ? Math.round(((p.originalPrice-p.price)/p.originalPrice)*100) : 0;
        return {...p,discountPercentage};
    })
    res.json({products:productwithDiscount.slice(0,10)});
}

// GET/api/products

export const getProducts=async (req:Request,res:Response) => {
    // const {category,search,minPrice,maxPrice,sort}=req.query;
    const products=await prisma.product.findMany();
    res.json({products});
}

// GET/api/products/:id

export const getProductById=async (req:Request,res:Response) => {
    const product=await prisma.product.findUnique({where:{id:req.params.id as string}});

    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    const discount=product.originalPrice && product.price ? Math.round(((product.originalPrice-product.price)/product.originalPrice)*100) : 0;
    return res.json({...product,discount});
}

// Post/api/products

export const createProduct=async (req:Request,res:Response) => {
    const product=await prisma.product.create({data:req.body});
    res.status(201).json({product});
}

// PUT/api/products/:id

export const updateProduct=async (req:Request,res:Response) => {
    const product=await prisma.product.update({where:{id:req.params.id as string},data:req.body});
    res.json({product});
}

// DELETE/api/products/:id

export const deleteProduct=async (req:Request,res:Response) => {
    const product=await prisma.product.delete({where:{id:req.params.id as string}});
    res.json({message:"Product deleted successfully"});
}