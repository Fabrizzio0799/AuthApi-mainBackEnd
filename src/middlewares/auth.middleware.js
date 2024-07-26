import jwt from 'jsonwebtoken';
import {secretKey} from '../libs/variables.js'; // Debe ser la misma en ambas APIs

// Middleware de autenticación
export const authenticateToken = (req, res, next) =>{
  // Obtener el token de la solicitud (generalmente se encuentra en la cabecera 'Authorization' o en una cookie)
  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
    req.user = decoded.idUser;    
    //El token es válido, puedes acceder a los datos del usuario y la compañía en 'decoded'
    next();
  });
}




