import Invoice from "../db/models/invoice.model.js";
export default class InvoiceService {
    async getAll(){
        try {
            const invoices = await Invoice.findAll();
            return invoices ? invoices : [];
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const invoice = await Invoice.findByPk(id);
            return invoice ? invoice : null;
        } catch (error) {
            console.log(error);
            
        }
    }

    async create(invoice){
        try {
            const newInvoice = await Invoice.create(invoice);
            return newInvoice ? newInvoice : null;
        } catch (error) {
            console.log(error);
            
        }
    }

    async update(id, invoice){
        try {
            console.log({ id, invoice });
        
            const [affectedRows] = await Invoice.update(invoice, { where: { id } });
            console.log({ affectedRows });
        
            if (affectedRows === 0) {
                console.log(`No se encontró una factura con id ${id} o no hubo cambios.`);
                return null;
            }
        
            // Si deseas devolver la factura actualizada
            const updatedInvoice = await Invoice.findByPk(id);
            console.log({ updatedInvoice });
        
            return updatedInvoice;
        } catch (error) {
            console.error('Error al actualizar la factura:', error);
            throw error;
        }
    }
    async getByStatus(status) {
        try {
            const invoices = await Invoice.findAll({ where: { status } });
            return invoices ? invoices : null;
        } catch (error) {
            console.log(error);
        }
    }
}