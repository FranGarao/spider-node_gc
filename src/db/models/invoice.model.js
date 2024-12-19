import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';
import InvoiceJob from './invoiceJob.js';


const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //TODO: en la db se guarda 0000-00-00
  delivery_date: {
    type: DataTypes.STRING,
    allowNull: false, // Corrige para que no haya dos claves "password"
  },
  phone: {
    type: DataTypes.STRING,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  deposit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'invoices', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});

Invoice.associate = function(models) {
  Invoice.belongsToMany(models.Job, {
    through: InvoiceJob,    // Tabla intermedia
    foreignKey: 'invoice_id', // Llave foránea de Invoice
    otherKey: 'job_id',      // Llave foránea de Job
  });
};
export default Invoice;
