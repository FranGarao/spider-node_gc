import express from 'express';
import SaleController from '../controllers/sales.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const route = express.Router();
const saleController = new SaleController();

route.get('/', authMiddleware, saleController.getAll);

route.post('/', authMiddleware, saleController.create);


export default route;
