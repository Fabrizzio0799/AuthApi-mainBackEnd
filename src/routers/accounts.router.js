import {Router} from 'express';
import {authenticateToken} from '../middlewares/auth.middleware.js';
import { DeleteAccounts, InsertAccounts, UpdateAccounts, getAccountByID, getAccountsByCompanies, getElement, } from '../controllers/accounts.controller.js';

export const accountRouter = Router();

accountRouter.get('/account',authenticateToken,getAccountsByCompanies);
accountRouter.get('/accountid/:key',authenticateToken,getAccountByID);
accountRouter.post('/accountinst',authenticateToken,InsertAccounts);
accountRouter.patch('/accountupt',authenticateToken,UpdateAccounts);
accountRouter.delete('/accountd/:key',authenticateToken,DeleteAccounts);
accountRouter.get('/element/:key',authenticateToken,getElement); 