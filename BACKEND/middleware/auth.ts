import {Request,Response,NextFunction} from 'express';
import jwt from "jsonwebtoken"


const auth=(req:Request,res:Response,next:NextFunction)=>{
    try{
            const authHeader=req.header.authorization;

            if(!authHeader ||!authHeader.startWith('Bearer')){
                return res.status(401).json({message:'No token provided, authrization denied'})
            }

            const token=authHeader.split(' ')[1];
            const decorde=jwt.verify(token,process.env.JWT_SECRET as String)
            as {id:String};
            req.user={id:decorde.id}
            next()
    }catch(error){
            console.log(error);
            return res.status(401).json({message:'Token is not valid'});
    }
}

export default auth;