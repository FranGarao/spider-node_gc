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

    async createPayment(req, res) {
        try {
            const payment = await paymentService.createPayment(req.body);
            res.status(200).json(payment);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createByQr(req, res) {
        try {
            const { invoice_id, mount, payment_method_id, payment_date } = req.query;
        
            // Valida los datos
            if (!invoice_id || !mount || !payment_method_id || !payment_date) {
              return res.status(400).json({ message: 'Missing required parameters' });
            }
        
            // Delegar la lógica al servicio
            const paymentResult = await paymentService.processPayment({
              invoiceId: invoice_id,
              mount: parseFloat(mount),
              paymentMethodId: payment_method_id,
              paymentDate: payment_date,
            });
        
            // Responder al cliente
            res.status(200).json(paymentResult);
          } catch (error) {
            console.error('Error creating payment:', error);
            res.status(500).json({ message: 'Error processing payment', error });
          }
        }
}