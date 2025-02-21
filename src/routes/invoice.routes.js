import express from 'express';
import InvoiceController from '../controllers/invoice.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const route = express.Router();
const invoiceController = new InvoiceController();

route.get('/',authMiddleware, invoiceController.getAll);

route.get('/:id',authMiddleware, invoiceController.getById);

route.get('/status/:status',authMiddleware, invoiceController.getByStatus);

route.put('/status/:id/:status', invoiceController.changeStatus);

route.post('/',authMiddleware, invoiceController.create);

route.put('/:id',authMiddleware, invoiceController.update);

route.delete('/:id',authMiddleware, invoiceController.delete);

route.get('/qr/:id',authMiddleware, invoiceController.generateQRCode);


export default route;
