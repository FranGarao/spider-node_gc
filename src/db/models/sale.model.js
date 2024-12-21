import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'sales', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});

export default Sale;
