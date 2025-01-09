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
}