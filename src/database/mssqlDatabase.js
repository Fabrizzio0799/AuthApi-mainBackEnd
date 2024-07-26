import sql from 'mssql';
import { dbDatabase, dbPsw, dbServer, dbUser } from '../libs/variables.js'

const dbConfig = {
    server: dbServer, // dirección del servidor de SQL Server
    database: dbDatabase, // nombre de tu base de datos
    user: dbUser, // nombre de usuario para acceder a SQL Server
    password: dbPsw, // contraseña del usuario de SQL Server
    options: {
        encrypt: false, // habilita el cifrado si estás utilizando una conexión segura
    },
};

const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to database');
        return pool;
    } catch (err) {
        console.log('Error connecting to database:', err);
        throw err
    }
}

export const executeQuery = async (query) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query(query);
        pool.close();
        
        // Devuelve un objeto con los resultados y un campo success
        return {
            success: true,
            recordset: result.recordset
        };
    } catch (error) {
        // Maneja el error y devuelve un objeto indicando el fallo
        console.error("Error executing query: ", error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const executeQueryLogin = async (query) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query(query);
        pool.close();
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

export const executeQueryWithParameters = async (query, parameters) => {
    try {
        const pool = await connectToDatabase();
        const request = pool.request();

        parameters.forEach((param) => {
            request.input(param.name, param.type, param.value);
        });

        const result = await request.query(query);
        pool.close();
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

