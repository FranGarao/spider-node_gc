import jwt from "jsonwebtoken";
import User from "../db/models/user.model.js";
export default class UserService {
    async login(res, user) {
        try {
            
            if (!user) return null;
            //TODO: encriptar la pw
            const foundUser = await User.findOne({ where: { username: user.username, password: user.password } });
            
            if (!foundUser) return null;

            const token = this.generateToken(foundUser);

            this.setCookies(res, token);
            return { token: token, authenticated: true };
        } catch (error) {
            return null
        }
        // Simulación de autenticación exitosa
    }
    // Método para generar un token JWT
    generateToken(user) {
        const payload = { id: user.id, username: user.username }; // Información que irá en el token
        const secret = process.env.TOKEN; // Clave secreta (usa variables de entorno para mayor seguridad)
        const options = { expiresIn: '24h' }; // Tiempo de expiración

        return jwt.sign(payload, secret, options);
    }

    // Método para verificar el token JWT
    verifyToken(token) {
        const secret = process.env.TOKEN; // Debe coincidir con la clave utilizada al generar el token
        try {
            return jwt.verify(token, secret); // Devuelve el payload si es válido
        } catch (error) {
            console.error('Invalid token:', error.message);
            return null; // Token inválido
        }
    }

    // Métodos para simular cookies
    setCookies(res, token) {
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('authToken', token, {
            httpOnly: true, // Solo accesible por el servidor, no por JavaScript del cliente
            secure: isProduction, // Requiere HTTPS en producción
            sameSite: isProduction ? 'strict' : 'lax', // O 'lax', dependiendo del flujo de tu aplicación
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });
    }
    clearCookies(res) {
        
        res.clearCookie('authToken', {
            httpOnly: true, // Debe coincidir con la configuración al establecer la cookie
            secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
            sameSite: 'strict', // Igual que cuando se creó
        });
        console.log('Cookie authToken eliminada');
    }
}