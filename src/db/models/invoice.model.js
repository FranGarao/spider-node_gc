import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

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

export default Invoice;
