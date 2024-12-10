import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'customers', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});

export default Customer;
