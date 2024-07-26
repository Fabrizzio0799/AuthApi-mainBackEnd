import express, { json } from 'express';
import morgan from 'morgan';
import { router } from "./routers/main.router.js";
import cookieParser from "cookie-parser"
import cors from "cors";

export const app = express();
//middlewares
app.use(json())
app.use(cors({origin:'http://localhost:3000',credentials: true}))
app.use(cookieParser());
app.use(morgan('dev'));
app.use(router);

