import UserService from "../services/user.services.js";
const userService = new UserService();
export default class UserController {
    async login(req, res) {
        try {
            if (!req.body?.username || !req?.body?.password) {
                res.status(400).json({ message: "Bad Request: Missing body" });
                return;
            }
            const result = await userService.login(res, {username: req?.body?.username, password: req?.body?.password});

            !result ? res.status(401).json({ message: "Unauthorized" }) : 
            res.status(200).json({ message: "Login successful", user: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    logout(req, res) {
        userService.clearCookies();
        res.status(200).json({ message: "Logout successful" });
    }
}

