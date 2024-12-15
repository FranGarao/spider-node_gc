import InvoiceJobs from "../db/models/invoiceJob.js";
import Invoice from "../db/models/invoice.model.js";
import InvoiceWithJobs from "../db/views/invoiceWithJobs.js";
import {formatInvoice, formatInvoices} from '../helpers/invoices.helper.js'
export default class InvoiceService {
    async getAll(){
        try {
            const invoices = formatInvoices(await InvoiceWithJobs.findAll());
            return invoices ? invoices : [];
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const invoice = formatInvoice(await InvoiceWithJobs.findByPk(id));
            return invoice ? invoice : null;
        } catch (error) {
            console.log(error);
        }
    }

    async create(invoice){
        try {
            console.log({invoice});
            // return
            const newInvoice = await Invoice.create(invoice);
            let jobs = [];
            // para giaradar registros en la tabla eintermedia, contar la cantidad de trabajos qu ese envian, por ejemplo 6, en ese caso hacemos un for en el que se guarden registros y le pasamos como variable el id del trabajo para que no haya registros repetidos
            while (invoice.jobs.lenght) {

                await InvoiceJobs.create(invoice)
            }
            if (invoice.jobs.length > 1) 
            InvoiceJobs.create(invoice)
            // await InvoiceJobs.create()
            return newInvoice ? newInvoice : null;
        } catch (error) {
            console.log(error);
            
        }
    }

    async update(id, invoice){
        try {        
            const [affectedRows] = await InvoiceWithJobs.update(invoice, { where: { id } });
            console.log({ affectedRows });
        
            if (affectedRows === 0) {
                console.log(`No se encontró una factura con id ${id} o no hubo cambios.`);
                return null;
            }
        
            // Si deseas devolver la factura actualizada
            const updatedInvoice = await InvoiceWithJobs.findByPk(id);
            console.log({ updatedInvoice });
        
            return updatedInvoice;
        } catch (error) {
            console.error('Error al actualizar la factura:', error);
            throw error;
        }
    }
    async getByStatus(status) {
        try {
            const invoices = await InvoiceWithJobs.findAll({ where: { status } });
            return invoices ? invoices : null;
        } catch (error) {
            console.log(error);
        }
    }
}