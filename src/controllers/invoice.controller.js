import InvoiceService from "../services/invoice.services.js";
const invoiceService = new InvoiceService();
export default class InvoiceController {
    async getAll(req, res) {
        try {
            let invoices = await invoiceService.getAll();
            invoices ? res.status(200).json({ message: "Listado de facturas", invoices }) :
            res.status(500).json({ message: "No se encontraron facturas" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-INV-ALL" });
        }
    }
    async getById(req, res){
        try {
            if (!req.params.id) return;
            const id = req.params.id;
            const invoice = await invoiceService.getById(id);
            invoice ? res.status(200).json({ message: "Factura encontrada", invoice }) :
            res.status(500).json({ message: "No se encontraron facturas" });
        } catch (error) {
            console.log(error);
        }
    }
    async create(req, res){
        try {
            console.log(req.body);
            
            if (!req.body) return;
            const invoice = {
                
            }
            const newInvoice = await invoiceService.create(req.body.invoice, req.body.paymentMethod);
            if (!newInvoice) {
                res.status(500).json({ message: "No se pudo crear la factura" });
                return;
            }
            res.status(200).json({ message: "Factura creada", newInvoice });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-INV-CRE" });
        }
    }
    async update(req, res){
        try {
            if (!req.body || !req.params.id) return;
            const id = req.params.id;
        
            const invoice = await invoiceService.update(id, req.body);
            if (!invoice) {
                res.status(204).json({ message: "No se pudo actualizar la factura" });
                return;
            }
            
            res.status(200).json({ message: "Factura actualizada", invoice });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-INV-UPD" });
        }
    }

    async delete(req, res){
        try {
            if (!req.params.id) return;
            const id = req.params.id;
            const invoice = await invoiceService.delete(id);
            invoice ? res.status(200).json({ message: "Factura eliminada", invoice }) :
            res.status(500).json({ message: "No se pudo eliminar la factura" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-INV-DEL" });
        }
    }
    async getByStatus(req, res){
        try {
            const status = req.params.status;
            const jobs = await invoiceService.getByStatus(status);
            jobs ? res.status(200).json({ message: "Listado de trabajos", jobs }) :
            res.status(500).json({ message: "No se encontraron trabajos" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-JOB-BYS" });
        }
    }
    mapInvoice(data) {
        return {
            id: data.id,
            customerId: data.customer_id,
            deliveryDate: data.delivery_date,
            deposit: parseFloat(data.deposit),
            phone: data.phone,
            status: data.status,
            totalPrice: parseFloat(data.total_price)
        };
    }
    async changeStatus (req, res) {
        try {
            if (!req.params.id || !req.params.status) return;
            const {id, status} = req.params;
            const invoice = await invoiceService.changeStatus(id, status);
            invoice ? res.status(200).json({ message: "Factura actualizada", invoice }) :
            res.status(500).json({ message: "No se pudo actualizar la factura" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-INV-UPD" });
        }
    }

    async generateQRCode(req, res) {
        try {
            if (!req.params.id) return;
            const id = req.params.id;
            const qrCode = await invoiceService.generateQRCode(id);
            qrCode ? res.status(200).json({ message: "QR Generado", qrCode }) :
            res.status(500).json({ message: "No se encontraron facturas" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-INV-GET" });
        }
    }
}
