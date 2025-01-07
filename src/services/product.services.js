import Product from "../db/models/product.model.js";
export default class SaleService {
    async getAll() {
        try {
            const products = await Product.findAll();
            return products ? products : null;
        } catch (error) {
            console.log(error);
        }
    }
    async create(product) { 
        try {
            console.log({product});
            
            if (!product) return null;
            const newProduct = await Product.create(product);
            return newProduct ? newProduct : null;       
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(id, product) {
        try {
            if (!id || !product) return null;
            const updatedProduct = await Product.update(product, { where: { id } });
            return updatedProduct ? updatedProduct : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async delete(id) {
        try {
            if (!id) return null;
            const deletedProduct = await Product.destroy({ where: { id } });
            return deletedProduct ? deletedProduct : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}