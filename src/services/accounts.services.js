import { executeQuery } from "../database/mssqlDatabase.js";
import { DeleteAccount, InsertAccount,UpdateAccount, getAccountByID, getAccountsByCompanies } from "../database/mssqlQueries.js"


export const GetAccountsByCompanies = async () => {
    try {
        const query = getAccountsByCompanies();
        const result = await executeQuery(query);
        return result;
    } catch (error) {
        throw error;
    }
}

export const GetAccountByID = async (id) => {
    try {
        const query = getAccountByID(id);
        const result = await executeQuery(query);
        return result;
    } catch (error) {
        throw error;
    }
}

export const inserAccounts = async (account) => {
    try {
        const query = InsertAccount(account);
        console.log("Generated Query: ", query); // Registro de la consulta generada
        const result = await executeQuery(query);
        console.log("Query Result in inserAccounts: ", result); // Verifica el resultado
        
        if (result.success) {
            return result; // Retorna el resultado si la operación fue exitosa
        } else {
            throw new Error(result.error); // Lanza un error si la operación falló
        }
    } catch (error) {
        console.error("Error in inserAccounts: ", error);
        throw error;
    }
};


export const InsertAccounts = async (req, res) => {
    try {
        const { account } = req.body;
        const result = await inserAccounts(account);
        //console.log("Result from inserAccounts: ", result); // Verifica el resultado recibido
        if (result && result.success) { // Ajusta esta verificación según el formato del resultado
            res.status(200).send("Account inserted successfully");
        } else {
            res.status(500).send("Error inserting account");
        }
    } catch (error) {
       // console.error("Error in InsertAccounts: ", error);
        res.status(400).send(error.message);    
    }
}


export const updateAccounts = async (account) => {
    try {
        const query = UpdateAccount(account);
        const result = await executeQuery(query);
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteAccounts = async (id) => {
    try {
        const query = DeleteAccount(id);
        const result = await executeQuery(query);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getElements = async (table) => {
    try {
        const query = `SELECT * FROM ${table}`;
        const result = await executeQuery(query);
        return result;
    } catch (error) {
        throw error;
    }
}