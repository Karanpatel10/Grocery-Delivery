import { Request,Response } from "express"
import { prisma } from "../Config/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken=(id:string)=>{
    return jwt.sign({id,role:"delivery"},process.env.JWT_SECRET as string,{expiresIn:"30d"})
}

// Login Delivery partner
// POST/api/delivery/login
export const loginPartner=async(req:Request,res:Response)=>{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({message:"Please provide email and password"})
        }
        const partner=await prisma.deliveryPartner.findUnique({where:{email:email.toLowerCase()}})

        if(!partner){
            return res.status(401).json({code:'INVALID_CREDENTIALS',message:"invalid email or passoword"})
        }
        const isMatch=await bcrypt.compare(password,partner.password);

        if (!isMatch) {
            return res.status(401).json({ code: 'INVALID_CREDENTIALS', message: "Invalid email or password"});
        }

        if(!partner?.isActive){
            return res.status(403).json({code:'ACCOUNT_DEACTIVATED',message:"Account is deactivated"})
        }

        const token=generateToken(partner.id);
        console.log('console token',token);
        const {password:_,...partnerData}=partner;
        res.json({partner:partnerData,token})    
        console.log('console partner',partner);
}

// Get assigned deliveries
// GET/api/delivery/my-deliveries

export const getMyDelivery=async(req:Request,res:Response)=>{
        const {status}=req.query;
        const where:any={deliveryPartnerId:req.partner!.id};
        if(status === "active"){
            where.status={in:["Assigned","Packed","Out for Delivery"]}
        }else if(status === "completed"){
             where.status={in:["Delivered","Cancelled"]}
        }       
        const orders=await prisma.order.findMany({where,include:{user:{select:{name:true,email:true,phone:true}}},orderBy:{createdAt:"desc"}})
        res.json({orders})
}

// Get single order Details
// GET/api/delivery/my-deliveries/:id

export const getDeliveryDetail=async(req:Request,res:Response)=>{
        const order=await prisma.order.findFirst({where:{id:req.params.id as string, deliveryPartnerId:req.partner!.id},include:{user:{select:{name:true,email:true,phone:true}}}})

        if(!order){
            return res.status(404).json({message:"order not found"})
        }
        res.json({order})
}

// Complete Delivery with otp
// PUT/api/delivery/my-deliveries/:id/complete

export const completeDelivery=async(req:Request,res:Response)=>{
    const {otp}=req.body;
    console.log("from otp from frontend",otp)
    const order=await prisma.order.findFirst({where:{id:req.params.id as string,deliveryPartnerId:req.partner!.id}})
    console.log("find order and otp",order)
    if(!order || order.status === "Canclled" || order.status === "Delivered"){
        return res.status(400).json({message:"Invalid Request"})
    }

    if(order.deliveryOtp !== otp){
        return res.status(401).json({message:"Invalid otp"})
    }

    const history=order.statusHistory as any[];
    history.push({status:"Delivered",note:"Delivered by Partner",timeStamp:new Date()})

    const updateOrder=await prisma.order.update({where:{id:order.id},data:{status:"Delivered",statusHistory:history,deliveryOtp:""}});
    res.json({order:updateOrder,message:"Delivered completed by Partner successfully"})
}

// cancle Delivery

export const cancleDelivery=async(req:Request,res:Response)=>{
    const {reason}=req.body;
    const order=await prisma.order.findFirst({where:{id:req.params.id as string,deliveryPartnerId:req.partner!.id}})

    if(order!.status === "Delivered"){
        res.status(400).json({message:"Order cannot be canclled by delivery partner"})
    }

    const history=order!.statusHistory as any[];
    history.push({status:"Canclled",note:reason || "",timeStamp:new Date()})

    const updateOrder=await prisma.order.update({where:{id:order!.id},data:{status:"Canclled",statusHistory:history}});
    res.json({order:updateOrder,message:"Canclled by Partner successfully"})

}

// update order status
// PUT/api/delivery/my-deliveries/:id/status

export const updateDeliveryStatus=async(req:Request,res:Response)=>{
    const {status}=req.body;
    const allowedStatus=["Delivered","Out for Delivery"];

    if(!allowedStatus.includes(status)){
        res.status(400).json({message:"Invalid status update! Unauthorized"});
        return;
    }
    const order=await prisma.order.findFirst({where:{id:req.params.id as string,deliveryPartnerId:req.partner!.id}});

    const history=order!.statusHistory as any[];
    history.push({status:`status updated to ${status}`,timeStamp:new Date()})

    const updateOrder=await prisma.order.update({where:{id:order!.id},data:{status,statusHistory:history}});
    res.json({order:updateOrder,message:"updated by Partner successfully"})
}

// Update Live Location
// PUT/api/delivery/my-deliveries/:id/location
export const updateLocation=async(req:Request,res:Response)=>{
    const {lat,lng}=req.body;
    
    const order=await prisma.order.findFirst({where:{id:req.params.id as string,deliveryPartnerId:req.partner!.id,status:{in:["Assigned","Packed","Out for Delivery"]}}});
    await prisma.order.update({where:{id:order!.id},data:{livelocation:{lat,lng,updatedAt:new Date()}}});
    
    res.json({sucess:true})
}

// Rider Account controller
// PUT/api/delivery/my-deliveries/:id/status
export const deliveryPartnerAccount=async(req:Request,res:Response)=>{
    const {id}=req.params;
    const {isActive}=req.body;
    try{
    const partner=await prisma.deliveryPartner.update({where:{id},data:{isActive}})
    res.json({partner})
    }catch(error:any){
        console.log(error.message)
        res.status(404).json({message:"Partner not found"})
    }
}