import { prisma } from "../Config/prisma.js"

// GET/api/user

export const getUSerInfo=async(req:Request,res:Response)=>{
    try{
            const userId=req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }
            const user=await prisma.user.findUnique({where: {id: userId,},select: {id: true,name: true,email: true,phone: true,createdAt: true,},});
            if (!user) {
                return res.status(404).json({message: "User not found",});
            }
            return res.status(200).json({user});

        }catch(error){
            console.log(error)
        }
}