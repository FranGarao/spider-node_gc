import express from 'express';
import CustomerController from '../controllers/customer.controller.js';

const route = express.Router();
const customerController = new CustomerController();

route.get('/', customerController.getAll);

route.get('/:id', customerController.getById);

route.post('/', customerController.create);

route.put('/:id', customerController.update);

export default route;
