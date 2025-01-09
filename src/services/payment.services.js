import Payment from '../db/models/payments.model.js'
import PaymentMethod from '../db/models/paymentMethods.model.js'
export default class PaymentService {
    async getMethods() {
        try {
            return PaymentMethod.findAll();
        } catch (error) {
            console.log(error); 
            return null;            
        }
    }
}