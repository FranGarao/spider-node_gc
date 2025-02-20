import express from 'express';
import PaymentController from '../controllers/payment.controller.js';
const route = express.Router();
const paymentController = new PaymentController();
import authMiddleware from '../middlewares/auth.middleware.js';

route.get('/methods',authMiddleware, paymentController.getMethods);

route.get('/methods/:id',authMiddleware, paymentController.getMethodById);

route.get("/",authMiddleware, paymentController.getAll);

route.get("/details",authMiddleware, paymentController.getAllWithDetails);

route.post("/",authMiddleware, paymentController.createPayment);

route.get('/create',authMiddleware, paymentController.createByQr);
 
export default route;
