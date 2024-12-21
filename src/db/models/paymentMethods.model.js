import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';
import InvoiceJob from './invoiceJob.js';


const PaymentMethod = sequelize.define('PaymentMethod', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'payment_methods', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});


export default PaymentMethod;
