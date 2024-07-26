import { secretKey } from "../libs/variables.js";
import jwt from "jsonwebtoken"

export const setCurrentCompany =  async(req,res)=>{
    try {
        const currentCompany = req.body;
        const token = jwt.sign(
            { idUser: req.user ,currentCompany},
            secretKey, // reemplaza esto con tu propia clave secreta para JWT
            { expiresIn: '1d' } // tiempo de expiración del token
          );
          const cookieOptions = {
            httpOnly: true,
            maxAge: 1000*60*60*24, // tiempo de expiracion
          };
          
          res.cookie('token',token,cookieOptions)
          return res.status(200).json({code:1,message:'Set Company Successfully'})
    } catch (error) {
        return res.status(500).json({message: 'Error try set company', detalle: error.message})
    } 
}