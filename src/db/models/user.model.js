import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // Corrige para que no haya dos claves "password"
  },
  two_factor_code: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});

export default User;
