import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'products', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});

export default Product;
