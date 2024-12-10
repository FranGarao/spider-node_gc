import express from 'express';
import UserController from '../controllers/user.controller.js';

const route = express.Router();
const userController = new UserController();

route.post('/login', userController.login);

route.get('/logout', userController.logout);

export default route;
