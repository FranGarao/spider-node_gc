import express from 'express';
import ProductController from '../controllers/product.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const route = express.Router();
const productController = new ProductController();

route.get('/', authMiddleware, productController.getAll);

// route.get('/:id', productController.getById);

route.post('/',  authMiddleware,productController.create);

route.put('/:id', authMiddleware, productController.update);

route.delete('/:id', authMiddleware, productController.delete);

export default route;
