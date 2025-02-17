import Payment from '../db/models/payments.model.js'
import PaymentMethod from '../db/models/paymentMethods.model.js'
import PaymentDetails from '../db/views/paymentDetails2.js';
import Invoice from '../db/models/invoice.model.js';
import InvoiceWithJobs from '../db/views/invoiceWithJobs.js';
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
    async createPayment(payment) {
        try {
            if (!payment.balance) {
                payment = await InvoiceWithJobs.findByPk(payment);
            }
            const today = new Date().toISOString().slice(0, 10);
            await Payment.create({invoice_id: payment.id, payment_method_id: payment.paymentMethodId, mount: payment.balance, payment_date: today});
            
        } catch (error) {
            return null;            
        }
    }

    processPayment = async ({ invoiceId, mount, paymentMethodId, paymentDate }) => {
        try {
          // Aquí puedes interactuar con tu base de datos o cualquier otra lógica
          console.log('Processing payment:', {
            invoiceId,
            mount,
            paymentMethodId,
            paymentDate,
          });
      
          // Simula la respuesta de éxito
          return {
            status: 'success',
            message: `Payment processed for invoice ${invoiceId}`,
            details: {
              invoiceId,
              mount,
              paymentMethodId,
              paymentDate,
            },
          };
        } catch (error) {
          console.error('Error in PaymentService:', error);
          throw new Error('Payment processing failed');
        }
      };
}


