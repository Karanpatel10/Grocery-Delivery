import { Request,Response } from "express";
import { prisma } from "../Config/prisma.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

// Generate token
const generateToken=(id:string)=>{
    return jwt.sign({id},process.env.JWT_SECRET as String ,{expiresIn:"30d"})
}

// check user Admin Login
const getAdminStatus=(email:String|null|undefined):boolean =>{
    if(!email) return false;
    const adminEmail=process.env.ADMIN_EMAIL?process.env.ADMIN_EMAIL.split(",").map((e)=>e.trim().toLowerCase()):[];
    return adminEmail.includes(email.toLowerCase());
}


// Register
// POST/api/auth/register

export const register=async (req:Request,res:Response) => {
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"Please provide all fields"});
    }

    const existingUSer=await prisma.user.findUnique({where:{email:email.toLowerCase()}});
     
    if(existingUSer){
        return res.status(400).json({message:"User already exists"})
    }

    const hashPassword=await bcrypt.hash(password,10);
    const user=await prisma.user.create({data:{name,email:email.toLowerCase(),password:hashPassword}})
    const token=generateToken(user.id)
    const userData:any={...user};
    delete userData.password;
    userData.isAdmin=getAdminStatus(userData.email)

    res.status(201).json({user:userData,token})
}

// Login
// POST/api/auth/login

export const login=async (req:Request,res:Response) => {
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:"Please provide email and password"});
    }

    const user =await prisma.user.findUnique({where:{email:email.toLowerCase()},include:{addresses:true}});

    if(!user){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const isPasswordMatch=await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
        return res.status(401).json({message:"Invalid password "});
    }

    const token=generateToken(user.id)
    const userData:any={...user};
    delete userData.password;
    userData.isAdmin=getAdminStatus(userData.email)

    res.status(200).json({user:userData,token})
}