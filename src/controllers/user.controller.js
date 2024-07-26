import {getUserByUserNameS,createUserS, getUserByUserIdS} from "../services/users.services.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {secretKey} from '../libs/variables.js'
import { getCompaniesByIdUserS } from "../services/company.services.js";

export const signUpUser = async(req,res)=>{
    try {
        const {user,pws} = req.body;
        const verifyUser = await getUserByUserNameS(user);
        if(verifyUser.length >0){            
            return res.status(401).json({code:-2,message:'User already exist'})
        }
        const hashedPassword = await bcrypt.hash(pws, 10);
        await createUserS(user,hashedPassword);
        return res.status(200).json({code:1,message:'Action execute Successfully'})
        
    } catch (error) {
        return res.status(500).json({code:-1,message:'Error to try create User'})
    }
}

export const signInUser = async(req,res)=>{
    try {
        const {user,pws} = req.body;
        const verifyUser = await getUserByUserNameS(user);

        if(verifyUser.length === 0){            
            return res.status(401).json({code:-2,message:'Credentials not founds'})
        }

        const passwordMatch = await bcrypt.compare(
            pws,
            verifyUser[0].password
          );

        if(!passwordMatch){
            return res.status(401).json({code:-2,message:'Credentials not founds'})
        };

        const getCompanies = await getCompaniesByIdUserS(verifyUser[0].IdUsuario);

        const token = jwt.sign(
            { user, idUser: verifyUser[0].IdUsuario, rol: verifyUser[0].Rol},
            secretKey,
            { expiresIn: '1d' } 
          );

          const cookieOptions = {
            httpOnly: true,
            maxAge: 1000*60*60*24, // tiempo de expiracion
          };
          
          res.cookie('token',token,cookieOptions)
          return res.status(200).json({code:1,message:'Action execute Successfully',user, getCompanies , rol: verifyUser[0].Rol})
        
    } catch (error) {
        return res.status(500).json({code:-1,message:'Error to try login',detail: error.message})
    }

}

export const signOutUser = async(req, res)=>{
    res.cookie('token','',{expires: new Date(0)})
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
}

export const checkAuth = async(req, res) =>{
    // Obtener el token de la solicitud (generalmente se encuentra en la cabecera 'Authorization' o en una cookie)
    try {
        const token = req.headers.authorization || req.cookies.token;  
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
  
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token de autenticación inválido' });
      }
      const getCompanies = await getCompaniesByIdUserS(decoded.idUser);
      const getUserData = await getUserByUserIdS(decoded.idUser)
      return res.status(200).json({...decoded,rol: getUserData[0].Rol,getCompanies,user: getUserData[0].Usuario})
    });
    } catch (error) {
        return res.status(500).json({code:-1,message:'Error to try check Auth'})
    };    
}
  