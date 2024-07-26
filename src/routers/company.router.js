import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { setCurrentCompany } from "../controllers/company.controller.js";

export const companyRouter = Router();

companyRouter.post('/',authenticateToken,setCurrentCompany)