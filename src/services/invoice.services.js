import InvoiceJob from "../db/models/invoiceJob.js";
import Invoice from "../db/models/invoice.model.js";
import Job from "../db/models/job.model.js";
import Payment from "../db/models/payments.model.js";
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

    async create(invoice, paymentMethod){
        try {
            console.log({test: invoice});
            invoice.total_price = invoice.total
            invoice.delivery_date = invoice.deliveryDate
            const today = new Date().toISOString().slice(0, 10);
            const newInvoice = await Invoice.create(invoice);
            await Payment.create({invoice_id: newInvoice.id, payment_method_id: paymentMethod.id, mount: invoice.deposit, payment_date: today});
            invoice.jobs.forEach(async (job, i) => {
                if (!Number(job)) {
                   const newJob =  await Job.create(job);
                   console.log({newJob});
                   await InvoiceJob.create({
                    invoice_id: newInvoice?.id,
                    job_id: newJob?.id,
                    quantity: 1
                })
                } else {
                    await InvoiceJob.create({
                        invoice_id: newInvoice?.id,
                        job_id: invoice.jobs[i],
                        quantity: 1
                    })
                }
                });
            return newInvoice ? newInvoice : null;
        } catch (error) {
            console.log({XDDDD: error});
        }
    }

    async update(id, invoice){
        try {        
              // Si hay trabajos en la solicitud, manejamos la lógica de actualización
              if (invoice.jobs) {
                // Obtener todos los trabajos actuales asociados al comprobante
                const invoiceJobs = await InvoiceJob.findAll({ where: { invoice_id: id } });
                
                // Convertimos los arrays a conjuntos para facilitar comparaciones
                const currentJobIds = invoiceJobs.map(job => job.job_id); // IDs actuales en la tabla
                const newJobIds = invoice.jobs; // IDs enviados en la solicitud
                
                const jobsToDelete = currentJobIds.filter(jobId => !newJobIds.includes(jobId));
                const jobsToAdd = newJobIds.filter(jobId => !currentJobIds.includes(jobId));
                console.log(jobsToDelete, jobsToAdd);   

                if (jobsToDelete.length) {
                    await InvoiceJob.destroy({
                        where: {
                            invoice_id: id,
                            job_id: jobsToDelete // Eliminar solo los IDs identificados
                        }
                    })
                }
                
                if (jobsToAdd.length) {
                    const newRecords = jobsToAdd.map(jobId => ({
                        invoice_id: id,
                        job_id: jobId,
                        quantity: 1
                    }));
                    await InvoiceJob.bulkCreate(newRecords); // Inserción masiva de los nuevos trabajos
                }
                console.log("Actualización completada: trabajos eliminados y agregados.");
            }
            
            const [affectedRows] = await Invoice.update(invoice, { where: { id } });
            if (affectedRows === 0) return null;
            const test = await Invoice.findByPk(id);
            console.log({ test: test.dataValues, invoice });
            
            const updatedInvoice = await InvoiceWithJobs.findByPk(id);
        
            return updatedInvoice;
        } catch (error) {
            console.error('Error al actualizar la factura:', error);
            throw error;
        }
    }
    async getByStatus(status) {
        try {
            const invoices = formatInvoices(await InvoiceWithJobs.findAll({ where: { status } }));
            return invoices ? invoices : null;
        } catch (error) {
            console.log(error);
        }
    }
}