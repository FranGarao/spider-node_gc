import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const SDPaymentDetails = sequelize.define('SDPaymentDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  invoice_id: {
    type: DataTypes.INTEGER,
  },
  customer: {
    type: DataTypes.STRING,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
  },
  date: {
    type: DataTypes.DATE, // Ajusta el tipo si tu campo 'payment_date' es de otro tipo
  },
  payment_method: {
    type: DataTypes.STRING,
  },
  jobs: {
    type: DataTypes.STRING, // Puedes usar DataTypes.TEXT si esperas un contenido muy largo
  },
}, {
  tableName: 'sd_paymentdetails', // Nombre de la vista en la base de datos
  timestamps: false,              // No se utilizan timestamps en vistas
});

export default SDPaymentDetails;
