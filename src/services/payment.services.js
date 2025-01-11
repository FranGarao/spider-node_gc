import Payment from '../db/models/payments.model.js'
import PaymentMethod from '../db/models/paymentMethods.model.js'
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
}