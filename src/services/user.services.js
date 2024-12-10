import User from "../db/models/user.model.js";
export default class UserService {
    async login(user) {
        try {
            if (!user) return null;
            //TODO: encriptar la pw
            const foundUser = await User.findOne({ where: { username: user.username, password: user.password } });
            console.log({foundUser});
            
            if (!foundUser) return null;
            this.setCookies();
            return { username: user.username, authenticated: true };
        } catch (error) {
            console.log(error);
            return {error: 'Error SER-U-LO'}
        }
        // Simulación de autenticación exitosa
    }
    setCookies(){
        console.log("seteando cookies...");
    }
    clearCookies(){
        console.log("limpiando cookies...");
    }
}