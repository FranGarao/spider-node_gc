import ProductService from "../services/product.services.js";
const productService = new ProductService();
export default class ProductController {

    async getAll(req, res) {
        try {
            const products = await productService.getAll();
            const response = {
                ok: true,
                products
            }
            res.status(200).json(response);
        } catch (error) {   
            console.log(error);
        }
    }
    async create(req, res) {
        try {
            if (!req.body) return;
            const product = {name: req.body.name, price: req.body.price};
            const newProduct = await productService.create(product);
            newProduct ? res.status(200).json({ message: "Producto creado", newProduct }) :
            res.status(500).json({ message: "No se pudo crear el producto" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-PRO-CRE" });
        }
    }
    async update(req, res) {
        try {
            if (!req.body || !req.params.id) return;
            const id = req.params.id;
            const product = await productService.update(id, req.body);
            product ? res.status(200).json({ message: "Producto actualizado", product }) :
            res.status(500).json({ message: "No se pudo actualizar el producto" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-PRO-UPD" });
        }
    }
    async delete(req,res){
        try {
            if (!req.params.id) return;
            const id = req.params.id;
            const product = await productService.delete(id);
            product ? res.status(200).json({ message: "Producto eliminado", product }) :
            res.status(500).json({ message: "No se pudo eliminar el producto" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-PRO-DEL" });
        }
    }
}