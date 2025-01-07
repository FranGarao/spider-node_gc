import express from 'express';
import ProductController from '../controllers/product.controller.js';

const route = express.Router();
const productController = new ProductController();

route.get('/', productController.getAll);

// route.get('/:id', productController.getById);

route.post('/', productController.create);

route.put('/:id', productController.update);

route.delete('/:id', productController.delete);

export default route;
