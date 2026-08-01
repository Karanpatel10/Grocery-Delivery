import  jwt  from 'jsonwebtoken';
import { NextFunction, Request,Response } from "express"
import { prisma } from '../Config/prisma.js';

const deliveryAuth=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader||!authHeader.startsWith("Bearer ")){
            return res.status(401).json({code:'INVALID_TOKEN',message:"no token provided"})
        }

        const token=authHeader.split(" ")[1];
        const decode=jwt.verify(token,process.env.JWT_SECRET as string) as {id:string,role:string};
        console.log("console decode",decode);
        if(decode.role !== "delivery"){
           return res.status(403).json({code:'ACCESS_DENIED',message:"Access Denied.Delivery partner only"})
        }

        const partner=await prisma.deliveryPartner.findUnique({where:{id:decode.id}})

        if(!partner || !partner.isActive){
            return res.status(403).json({code:'ACCOUNT_DEACTIVATED',message:"Account is deactivated"})
        }
        req.partner=partner;
        next();

    }catch(error){
        console.log(error)
        res.status(401).json({code:'INVALID_TOKEN',message:'token is not valid'})
    }
}

export default deliveryAuth