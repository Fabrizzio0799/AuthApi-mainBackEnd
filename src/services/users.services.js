import {executeQueryLogin, executeQueryWithParameters} from '../database/mssqlDatabase.js';
import {getUserByUserName,createUser, getUserByUserId} from '../database/mssqlQueries.js';

export const  getUserByUserNameS = async(user)=>{
    try {       
    const query = getUserByUserName(user);
    const result = await executeQueryLogin(query);
    return result
    } catch (error) {
        throw error
    }
    
};

export const  getUserByUserIdS = async(user)=>{
    try {       
    const query = getUserByUserId(user);
    const result = await executeQueryLogin(query);
    return result
    } catch (error) {
        throw error
    }
    
};

export const createUserS = async(user,psw)=>{
    try {     
        const query = createUser(user,psw);
        const result = executeQueryLogin(query);
        return result;
    } catch (error) {
        throw error
    }
}
