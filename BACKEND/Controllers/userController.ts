import { prisma } from "../Config/prisma.js"

// GET/api/user

export const getUserInfo=async(req:Request,res:Response)=>{
            const userId=req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }
            const user=await prisma.user.findUnique({where: {id: userId,},select: {id: true,name: true,email: true,phone: true,createdAt: true,addresses:true},});
            if (!user) {
                return res.status(404).json({message: "User not found",});
            }
            return res.status(200).json({user});
        
}

// PUT/api/user

export const updateUserInfo=async(req:Request,res:Response)=>{
    const {name,phone}=req.body;
    const userId=req.user?.id;
    if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
    }
    const user=await prisma.user.update({where:{id:userId},data:{name,email,phone},select:{id:true,name:true,email:true,phone:true}})
    return res.status(200).json({message:'Profile update Successfully',user})
}