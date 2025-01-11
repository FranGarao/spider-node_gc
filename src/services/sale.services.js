import Payments from "../db/models/payments.model.js";
import Sale from "../db/models/sale.model.js";
import Product from "../db/models/product.model.js";
export default class SaleService {
    async getAll() {
        try {
            const sales = await Sale.findAll();
            return sales ? sales : null;
        } catch (error) {
            console.log(error);
        }
    }
    async create(sale) { 
        try {
            const product = await Product.findByPk(sale.product_id);

            if (!sale) return null;
            const newSale = await Sale.create({product_name: product.name, product_price: product.price, payment_id: sale.payment_id, sale_date: sale.date});
            
            return newSale ? newSale : null;       
        } catch (error) {
            console.log(error);
            
            return null;
        }
    }
}