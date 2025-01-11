import express from 'express';
import InvoiceController from '../controllers/invoice.controller.js';

const route = express.Router();
const invoiceController = new InvoiceController();

route.get('/', invoiceController.getAll);

route.get('/:id', invoiceController.getById);

route.get('/status/:status', invoiceController.getByStatus);

route.put('/status/:id/:status', invoiceController.changeStatus);

route.post('/', invoiceController.create);

route.put('/:id', invoiceController.update);

route.delete('/:id', invoiceController.delete);


export default route;
