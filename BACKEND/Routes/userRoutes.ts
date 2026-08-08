import express from 'express'
import auth from '../middleware/auth.js';
import { getUserInfo, updateUserInfo } from '../Controllers/userController.js';

const userRoute=express.Router();

userRoute.get("/",auth,getUserInfo);
userRoute.patch("/",auth,updateUserInfo);

export default userRoute