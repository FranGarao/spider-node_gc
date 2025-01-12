import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const PaymentDetails = sequelize.define('PaymentDetails', {
  // payment_id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  // },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoice_id: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.STRING,
  },
  customer: {
    type: DataTypes.STRING,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
  },
  payment_method: {
    type: DataTypes.STRING,
  },
  jobs: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'paymentDetails', // Nombre de la vista en la base de datos
  timestamps: false,            // No uses timestamps con vistas
});

export default PaymentDetails;
