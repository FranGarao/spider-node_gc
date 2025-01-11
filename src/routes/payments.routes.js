import express from 'express';
import PaymentController from '../controllers/payment.controller.js';
const route = express.Router();
const paymentController = new PaymentController();

route.get('/methods', paymentController.getMethods);

route.get('/methods/:id', paymentController.getMethodById);

route.get("/", paymentController.getAll);

export default route;
