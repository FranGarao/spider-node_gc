import express from 'express';
import PaymentController from '../controllers/payment.controller.js';
const route = express.Router();
const paymentController = new PaymentController();

route.get('/methods', paymentController.getMethods);

export default route;
