import { Request,Response } from "express"
import { prisma } from "../Config/prisma.js"

// Get user addresses
// GET/api/addresses

export const getAddressess=async(req:Request,res:Response)=>{
    const addressess=await prisma.address.findMany({where:{userId:req.user!.id},orderBy:{createdAt:"asc"}});
    res.json({addressess});
}

// Add new address
// POST/api/addresses

export const addAddress=async(req:Request,res:Response)=>{
        const {label,address,city,state,zip,isDefault,lat,lng}=req.body;

        // Request coordination
        if(lat == null || lng == null){
            return res.status(400).json({message:"Location coordiantion required.Please allow Location access.... "})
        }

        const currentAddresses=await prisma.address.findMany({where:{userId:req.user!.id}})

        let makeDefault=isDefault;
        if(currentAddresses.length === 0) makeDefault=true;

        if(makeDefault){
            await prisma.address.updateMany({where:{userId:req.user!.id},data:{isDefault:false}})
        }

        const addresses=await prisma.address.create({data:{userId:req.user!.id,label,address,city,state,zip,isDefault:makeDefault,lat:Number(lat),lng:Number(lng)}})
        res.status(201).json({address:addresses})
}

// Update Address
// PUT/api/addressess/:id
export const updateAddress=async(req:Request,res:Response)=>{
    const {label,address,city,state,zip,isDefault,lat,lng}=req.body;

        // Request coordination
        if(lat == null || lng == null){
            return res.status(400).json({message:"Location coordiantion required.Please allow Location access.... "})
        }

        if(isDefault){
            await prisma.address.updateMany({where:{userId:req.user!.id},data:{isDefault:false}})
        }

        const data:any={};
        if(label) data.label=label;
        if(address) data.address=address;
        if(city) data.city=city;
        if(state) data.state=state;
        if(zip) data.zip=zip;
        if(isDefault !== null) data.isDefault=isDefault;
        if(lat != null) data.lat=Number(lat);
        if(lng != null) data.lng=Number(lng);

        try{
            await prisma.address.update({where:{id:req.params.id as string},data})
        }catch(error){
            console.log(error);
            res.status(404).json({message:"Address not found"})
        }
        
        const addressess=await prisma.address.findMany({where:{userId:req.user!.id},orderBy:{createdAt:"asc"}});
        res.json({addressess})
}

// Delete Address
// DELETE/api/addresses/:id

export const deleteAddress=async(req:Request,res:Response)=>{
    try{
        await prisma.address.delete({where:{id:req.params.id as string}})
    }catch(error:any){
        console.log(error.message);
    }

    const addressess=await prisma.address.findMany({where:{userId:req.user!.id},orderBy:{createdAt:"asc"}});
    res.json({addressess})
}