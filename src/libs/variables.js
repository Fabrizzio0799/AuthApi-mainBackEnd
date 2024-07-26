import {config} from 'dotenv'
config();

export const port = process.env.PORT || 30001;
export const dbServer = process.env.DB_SERVER;
export const dbDatabase = process.env.DATABASES;
export const dbPort = process.env.DB_PORT;
export const dbUser = process.env.DB_USER;
export const dbPsw = process.env.DB_PSW;
export const secretKey = process.env.SECRET_KEY;
