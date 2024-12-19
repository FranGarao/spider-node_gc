import express from 'express';
import UserController from '../controllers/user.controller.js';

const route = express.Router();
const userController = new UserController();

route.post('/login', userController.login);

route.get('/logout', userController.logout);

route.get('/protected', (req, res) => {
    const token = req.cookies['authToken'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = userService.verifyToken(token);
    if (!payload) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    return res.status(200).json({ message: 'Access granted', user: payload });
});

export default route;
