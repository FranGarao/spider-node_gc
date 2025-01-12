import Payment from '../db/models/payments.model.js'
import PaymentMethod from '../db/models/paymentMethods.model.js'
import PaymentDetails from '../db/views/paymentDetails.js';
import Invoice from '../db/models/invoice.model.js';
export default class PaymentService {
    async getAll() {
        try {
            return Payment.findAll();
        } catch (error) {
            console.log(error); 
            return null;            
        }
    }
    
    async getMethods() {
        try {
            return PaymentMethod.findAll();
        } catch (error) {
            console.log(error); 
            return null;            
        }
    }

    async getMethodById(id) {
        try {
            return PaymentMethod.findByPk(id);
        } catch (error) {
            console.log(error); 
            return null;            
        }
    }

    async getAllWithDetails() {
        try {

            const payments = await PaymentDetails.findAll();
            console.log({payments});
            
            return payments;
        } catch (error) {
            console.log(error); 
            return null;            
        }
    }
    async createPayment(id) {
        try {
            console.log({id});
            const invoice = await Invoice.findByPk(id);
            console.log({invoice});
            const balance = invoice.total_price - invoice.deposit;
            //TODO: agregar metodo de pago en alerta de terminar 
            const today = new Date().toISOString().slice(0, 10);
            await Payment.create({invoice_id: invoice.id, payment_method_id: paymentMethod.id, mount: invoice.balance, payment_date: today});
            
        } catch (error) {
            console.log(error);
            
        }
    }
}