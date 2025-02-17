import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const InvoiceJob = sequelize.define('InvoiceJob', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Opcional, si ya existe en la tabla intermedia
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  job_id: {
    type: DataTypes.INTEGER,
  },
  job: {
    type: DataTypes.STRING(255),
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'invoice_job', // Nombre de la tabla en la base de datos
  timestamps: false,       // Desactiva createdAt y updatedAt
});

export default InvoiceJob;
