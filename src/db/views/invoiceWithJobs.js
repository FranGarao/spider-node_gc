import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const InvoiceWithJobs = sequelize.define('InvoiceWithJobs', {
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
  job_names: {
    type: DataTypes.STRING, // O JSON si la vista devuelve JSON_ARRAYAGG
  },
}, {
  tableName: 'invoice_with_jobs', // Nombre de la vista en la base de datos
  timestamps: false,             // No uses timestamps con vistas
});

export default InvoiceWithJobs;
