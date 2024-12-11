import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const Sale = sequelize.define('Sale', {
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
    allowNull: true, // Corrige para que no haya dos claves "password"
  },
}, {
  tableName: 'sales', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});

export default Sale;
