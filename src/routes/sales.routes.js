import express from 'express';
import SaleController from '../controllers/sales.controller.js';

const route = express.Router();
const saleController = new SaleController();

route.get('/', saleController.getAll);

route.post('/', saleController.create);


export default route;
