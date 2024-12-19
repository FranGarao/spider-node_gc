import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';
import InvoiceJob from './invoiceJob.js';


const Job = sequelize.define('Job', {
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
  tableName: 'jobs', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});

Job.associate = function(models) {
  Job.belongsToMany(models.Invoice, {
    through: InvoiceJob,    // Tabla intermedia
    foreignKey: 'job_id',    // Llave foránea de Job
    otherKey: 'invoice_id', // Llave foránea de Invoice
  });
};
export default Job;
