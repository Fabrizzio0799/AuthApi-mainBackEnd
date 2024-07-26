import { Router } from "express";
import { userRouter } from "./user.router.js";
import { companyRouter } from "./company.router.js";
import { accountRouter } from "./accounts.router.js";



export const router = Router();

router.get('/api/v1/status', (req,res)=>{res.status(200).send("This AUTH Api is running")})
router.use('/api/v1/user',userRouter);
router.use('/api/v1/company',companyRouter);
router.use('/api/v1/account',accountRouter);
