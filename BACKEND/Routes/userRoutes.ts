import express from 'express'
import auth from '../middleware/auth.js';
import { getUSerInfo } from '../Controllers/userController.js';

const userRoute=express.Router();

userRoute.get("/",auth,getUSerInfo);

export default userRoute