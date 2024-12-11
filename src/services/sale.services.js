import Sale from "../db/models/sale.model.js";
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
            if (!sale) return null;
            const newSale = await Sale.create(sale);
            return newSale ? newSale : null;       
        } catch (error) {
            console.log(error);
        }
    }
}