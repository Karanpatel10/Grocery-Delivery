import { Request,Response } from "express"
import { prisma } from "../Config/prisma.js";
import { inngest } from "../Inngest/index.js";

// Create Order
// Post/api/orders

export const createOrder=async(req:Request,res:Response)=>{
    const{items,shippingAddress,paymentMethod}=req.body;

    // check if order items are empty
    if(!items || items.length === 0){
        return res.status(400).json({message:"No other items"})
    }

    // look actual price in database
    const productIds=items.map((i:any)=>i.product);
    const products=await prisma.product.findMany({where:{id:{in:productIds}}});

    const productMap:Record<string,(typeof products)[0]>={}
    products.forEach((p:any)=>(productMap[p.id]=p))

    // check if product in stock
    for(const item of items){
        const product=productMap[item.product];
        if(!product || (product.stock ?? 0)<item.quantity){
            return res.status(404).json({message:"Product not in stock"})
        }
    }

    const orderItems=items.map((item:any)=>{
        const dpProduct=productMap[item.product];
        if(!dpProduct) throw new Error(`Product not found: ${item.product}`);
        return{
            product:dpProduct.id,
            name:dpProduct.name,
            image:dpProduct.image,
            price:dpProduct.price,
            quantity:item.quantity,
            unit:dpProduct.price,
        }
    })

    const subtotal=orderItems.reduce((sum:number,item:any)=>sum+item.price*item.quantity,0);
    const deliveryFee=subtotal>20?0:1.99;
    const tax=Math.round(subtotal*0.8*100)/100;
    const total=Math.round((subtotal+deliveryFee+tax)*100)/100;

    const order=await prisma.order.create({
        data:{
            userId:req.user!.id,
            items:orderItems,
            subtotal,
            deliveryFee,
            tax,
            total,
            shippingAddress,
            paymentMethod,
            statusHistory:[{status:"placed",notes:"Order placed successfully",timestamp:new Date()}],
        }
    })

    if(paymentMethod==="card"){
        // stripe payment link
    }

    res.status(201).json({message:"Order created successfully",order})

    // Decrease stock of products

    for(const item of items){
        await prisma.product.update({
            where:{id:item.product},
            data:{stock:{decrement:item.quantity}}
        })
    }

    // send stock update events for each product in the order

    for(const item of orderItems){
        await inngest.send({name:"inventory/stock.updated",data:{productId:item.product}})
    }
        try{
            await inngest.send({name:'order/placed',data:{orderId:order.id}})
            console.log("Inngest send result:", result);
        } catch (err) {
        console.error("Inngest send failed:", err);
        }
}

// Get user Order Data
// GET/api/orders

export const getUserOrders=async(req:Request,res:Response)=>{
   try{
    console.log("Step 1");
    console.log(req.user);
    const {status}=req.query;
        const where:any={userId:req.user!.id,NOT:[{paymentMethod:"card",isPaid:false}]};
    console.log("Step 2", where);
        if(status && status!=="all"){
            where.status=status;
        }
 
        const orders=await prisma.order.findMany({where,include:{deliveryPartner:{select:{name:true,phone:true}}},orderBy:{createdAt:"desc"}});
    console.log("Step 3", orders);
        res.status(200).json({message:"User orders fetched successfully",orders})
   }catch(error){
    console.log(error);
    res.status(500).json(error);
   }
}

// Get single order
// GET/api/orders/:id

export const getSingleOrder=async(req:Request,res:Response)=>{
    const order=await prisma.order.findFirst({where:{id:req.params.id as string,userId:req.user!.id},include:{deliveryPartner:{select:{name:true,phone:true,avatar:true,vehicleType:true}}}});

    if(!order)
    {
        return res.status(404).json({message:"Order not found"})
    }
    res.status(200).json({message:"Order fetched successfully",order})
}

// Update order status(admin only)
// Put/api/orders/:id/status

export const updateOrderStatus=async(req:Request,res:Response)=>{
    const{status,note}=req.body;

    const order=await prisma.order.findUnique({where:{id:req.params.id as string}});

    if(!order){
        return res.status(404).json({message:"Order not found"})
    }

    const history=(Array.isArray(order.statusHistory)?order.statusHistory:[] as any[])
    history.push({status,note:note || `order ${status.toLowerCase()}`,timestamp:new Date()});

    const updatedOrder=await prisma.order.update({where:{id:req.params.id as string},data:{status,statusHistory:history}});
    res.status(200).json({message:"Order status updated successfully",order:updatedOrder})
}

// Get all orders(admin only)
// GET/api/orders/all

export const getAllOrdersAdmin=async(req:Request,res:Response)=>{
    const orders=await prisma.order.findMany({where:{NOT:[{paymentMethod:"card",isPaid:false}]},include:{user:{select:{name:true,email:true}},deliveryPartner:{select:{name:true,phone:true,email:true}}},orderBy:{createdAt:"desc"}});
    res.status(200).json({message:"All orders fetched successfully",orders})
}

// Get order Location
// GET/api/orders/:id/location

export const getOrderLocation=async(req:Request,res:Response)=>{
    const order=await prisma.order.findUnique({where:{id:req.params.id as string,userId:req.user!.id},select:{liveLocation:true,status:true}});
    if(!order){
        return res.status(404).json({message:"Order not found"})
    }
    res.status(200).json({message:"Order location fetched successfully",liveLocation:order?.liveLocation,status:order?.status})
}
