// auth.middleware.js
import UserService from '../services/user.services.js';
const userService = new UserService();
import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // Verifica que el header Authorization exista y siga el esquema "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado o formato inválido' });
    }
  console.log({authHeader});
  
    const token = authHeader.split(' ')[1];
  console.log({token});
  
    try {
      // Verifica el token usando la clave secreta
      const decoded = jwt.verify(token, process.env.TOKEN);
      // Puedes adjuntar el payload a la petición para usarlo en rutas posteriores
      req.user = decoded;
      next();
    } catch (error) {
        
      return res.status(401).json({ message: 'Token inválido', error: error.message });
    }
  };

export default authMiddleware;