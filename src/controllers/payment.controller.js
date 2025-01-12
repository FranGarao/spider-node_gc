import PaymentService from "../services/payment.services.js";
const paymentService = new PaymentService();
export default class PaymentController {
    async getMethods(req, res) {
        try {
            const methods = await paymentService.getMethods();
            res.status(200).json(methods);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getMethodById(req, res) {
        try {
            const method = await paymentService.getMethodById(req.params.id);
            res.status(200).json(method);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAll(req, res) {
        try {
            const payments = await paymentService.getAll();
            res.status(200).json(payments);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAllWithDetails(req, res) {
        try {
            const payments = await paymentService.getAllWithDetails();
            res.status(200).json(payments);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}