import {signUpUser,loginUser} from '../controllers/userControllers.js';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/signup',signUpUser);
userRouter.post('/login',loginUser);

export default userRouter;