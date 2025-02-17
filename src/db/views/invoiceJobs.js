import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const SDInvoiceJobs = sequelize.define('SDInvoiceJobs', {
  invoice_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
  },
  delivery_date: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  deposit: {
    type: DataTypes.DECIMAL(10, 2),
  },
  status: {
    type: DataTypes.STRING,
  },
  jobs: {
    type: DataTypes.STRING, // O DataTypes.JSON si la vista devuelve un JSON
  },
}, {
  tableName: 'SD_invoiceJobs', // Nombre de la vista en la base de datos
  timestamps: false,           // No se usan timestamps con vistas
});

export default SDInvoiceJobs;
