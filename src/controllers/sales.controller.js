import SaleService from "../services/sale.services.js";
const salesService = new SaleService();
export default class SaleController {
    async getAll(req, res) {
        try {
            const sales = await salesService.getAll();
            sales ? res.status(200).json({ message: "Ventas encontradas", sales }) :
            res.status(500).json({ message: "No se encontraron ventas" });
        } catch (error) {
            console.log(error);
        }
    }

    async create(req, res) {
        try {
            if (!req.body) return;
            console.log({REQ:req.body});
            
            const newSale = await salesService.create(req.body);
            newSale ? res.status(200).json({ message: "Venta creada", newSale }) :
            res.status(500).json({ message: "No se pudo crear la venta" });
        } catch (error) {
            console.log(error);
        }
    }
}