export const formatInvoice = (invoice) => {
  return {
    id: invoice.invoice_id,
    customerId: invoice.customer_id,
    deliveryDate: new Date(invoice.delivery_date).toLocaleDateString('en-US'), // Formatea la fecha
    phone: invoice.phone || 'N/A', // Valor predeterminado si el teléfono es nulo
    totalPrice: parseFloat(invoice.total_price).toFixed(2), // Asegura que sea un decimal con 2 decimales
    deposit: parseFloat(invoice.deposit).toFixed(2),
    balanceDue: (invoice.total_price - invoice.deposit).toFixed(2), // Calcula saldo pendiente
    status: invoice.status.toUpperCase(), // Formatea el estado en mayúsculas
    jobs: invoice.job_names || [], // Incluye los trabajos si están disponibles
  };
};
// id: invoice.invoice_id,
                    // deliveryDate: invoice.delivery_date,
                    // phone: invoice.phone,
                    // total: invoice.total_price,
                    // deposit: invoice.deposit,
                    // status: invoice.status,
                    // jobs: invoice.job_names,
                    // balance:Number(invoice.total_price) - Number(invoice.deposit)
// 
// Si necesitas formatear una lista de facturas
export const formatInvoices = (invoices) => {
  return invoices.map(formatInvoice);
};