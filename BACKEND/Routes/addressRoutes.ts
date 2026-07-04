import  express  from 'express';
import { addAddress, deleteAddress, getAddressess, updateAddress } from '../Controllers/addressController.js';
import auth from '../middleware/auth.js';

const addressRoute=express.Router();

addressRoute.get("/",auth,getAddressess)
addressRoute.post("/",auth,addAddress)
addressRoute.put("/:id",auth,updateAddress)
addressRoute.delete("/:id",auth,deleteAddress)


export default addressRoute