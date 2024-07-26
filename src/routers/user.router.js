import { Router } from "express";
import {checkAuth, signInUser, signOutUser, signUpUser} from "../controllers/user.controller.js"


export const userRouter = Router();

userRouter.post('/signUp',signUpUser);
userRouter.post('/signOut',signOutUser);
userRouter.post('/signIn',signInUser);
userRouter.get('/checkAuth',checkAuth);



