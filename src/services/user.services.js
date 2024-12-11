import jwt from "jsonwebtoken";
import User from "../db/models/user.model.js";
export default class UserService {
    async login(user) {
        try {
            if (!user) return null;
            //TODO: encriptar la pw
            const foundUser = await User.findOne({ where: { username: user.username, password: user.password } });
            
            if (!foundUser) return null;

            const token = this.generateToken(foundUser);

            this.setCookies(token);
            return { username: user.username, authenticated: true };
        } catch (error) {
            console.log(error);
            return {error: 'Error SER-US-LO'}
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
    setCookies(token) {
        console.log("Seteando cookies con token:", token);
    }
    clearCookies(){
        console.log("limpiando cookies...");
    }
}