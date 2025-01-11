import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  product_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
  },
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sale_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'sales', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});

export default Sale;
