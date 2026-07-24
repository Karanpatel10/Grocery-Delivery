import  bcrypt  from 'bcrypt';
import { Request,Response } from 'express';
import { prisma } from "../Config/prisma.js"

// get admin dashboard data
export const getAdminStats=async(req:Request,res:Response)=>{
        const [totalOrders,totalUsers,totalProducts,outOfStock,totalPartners,recentOrders]=await Promise.all([
            prisma.order.count({where:{NOT:{paymentMethod:"card",isPaid:false}}}),
            prisma.user.count(),
            prisma.product.count(),
            prisma.product.count({where:{stock:0}}),
            prisma.deliveryPartner.count(),
            prisma.order.findMany({where:{NOT:{paymentMethod:"card",isPaid:false}},orderBy:{createdAt:"desc"},take:8,include:{user:{select:{name:true,email:true}},deliveryPartner:{select:{name:true,email:true}}}})
        ]);
        res.json({totalOrders,totalUsers,totalProducts,outOfStock,totalPartners,recentOrders});
}


// get Delivery-partner list for admin
export const getdeliveryPartner=async(req:Request,res:Response)=>{
    const partner=await prisma.deliveryPartner.findMany({orderBy:{createdAt:"desc"}})
    res.json({partner})
}

// Create profile for deliveryPartner

export const createDeliveryPartner=async(req:Request,res:Response)=>{
    const {name,email,password,phone,vehicleType}=req.body;

    if(!name||!email||!password||!phone){
        res.status(400).json({message:"Plases provide all field details"});
        return;
    }

    const hasPassword=await bcrypt.hash(password,10);

    const partner=await prisma.deliveryPartner.create({data:{name,email:email.toLowerCase(),password:hasPassword,phone,vehicleType}})
    res.status(201).json({partner})
}

// Update profile of delivertPartner

export const updateDeliveryPartner=async(req:Request,res:Response)=>{
    const { id } = req.params;
    console.log(id);
    const {name,email,phone,vehicleType,isActive}=req.body;

    const data:any={};
    if(name) data.name=name;
    if(email) data.email=email;
    if(phone) data.phone=phone;
    if(vehicleType) data.vehicleType=vehicleType;
    if(typeof isActive === 'boolean') data.isActive=isActive;

    try{
        const partner=await prisma.deliveryPartner.update({where:{id:req.user!.id as string},data});
        res.json({partner})
    }catch(error:any){
        console.log(error.message)
        res.status(404).json({message:"Partner not found"})
    }
}

// assign delivery partner for order

export const assignDeliveryPartner=async(req:Request,res:Response)=>{
        const {partnerId}=req.body;

        const order=await prisma.order.findUnique({where:{id:req.params.id as string}})

        const partner=await prisma.deliveryPartner.findUnique({where:{id:partnerId}})

        const otp=String(Math.floor(100000*Math.random()*900000).toString())

        let status=order!.status;

        const history:any[]=Array.isArray(order!.statusHistory)?order!.statusHistory:[];

        if(order!.status==="Placed" || order!.status==="Confirmed"){
            status="Assigned";
            history.push({status:"Assigned",note:`Assigned to ${partner!.name}`,timestamp:new Date()})
        }

        await prisma.order.update({where:{id:order!.id},data:{deliveryPartnerId:partner!.id,otp,status,statusHistory:history}})

        res.json({message:`Order assigned to ${partner!.name} successfully`,order})
    }