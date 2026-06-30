import { Request,Response,NextFunction } from 'express';
import { prisma } from '../Config/prisma.js';

const admin=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId=req.user?.id;
        if(!userId){
            return res.status(401).json({message:'Unauthroized'});
        }
        const user=await prisma.user.findUnique({where:{id:userId}})

        if(!user){
            return res.status(404).json({message:'user not found'})
        }

        const adminEmail=process.env.ADMIN_EMAIL?process.env.ADMIN_EMAIL.split(' ').map((e)=>e.trim().toLowerCase()):[];

        if(adminEmail.includes(user.email.toLowerCase())){
            if(req.user) req.user.isAdmin=true;
            next()
        }else{
             res.status(403).json({message:'Admin access required'})
        }

    }catch(error:any){
        console.log(error);
        res.status(500).json({message:'Admin verification failed',error:error.message})
    }

}

export default admin