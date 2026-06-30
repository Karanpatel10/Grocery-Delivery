import { User,DeliveryPartner } from "../../generated/prisma/browser.ts";

declare global{
    namespace Express{
        interface Request{
            user?:{
                id:string;
                isAdmin:boolean;
            }
            partner?:DeliveryPartner{

            }
        }   
    }
}

export {};