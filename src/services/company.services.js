import {executeQuery} from '../database/mssqlDatabase.js';
import {getCompaniesByIdUser} from '../database/mssqlQueries.js';

export const  getCompaniesByIdUserS = async(id)=>{
    try {       
    const query = getCompaniesByIdUser(id);
    const result = await executeQuery(query);
    return result.recordset
    } catch (error) {
        throw error
    }
    
};


