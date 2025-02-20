import express from 'express';
import CustomerController from '../controllers/customer.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const route = express.Router();
const customerController = new CustomerController();

route.get('/',authMiddleware, customerController.getAll);

route.get('/:id',authMiddleware, customerController.getById);

route.post('/',authMiddleware, customerController.create);

route.put('/:id',authMiddleware, customerController.update);

route.delete('/:id',authMiddleware, customerController.delete);

export default route;
