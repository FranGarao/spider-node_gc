import { DataTypes } from 'sequelize';
import sequelize from '../instance/connection.js';

const Payments = sequelize.define('Payments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_method_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mount: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  
}, {
  tableName: 'payments', // Nombre de la tabla en la base de datos
  timestamps: false,   // Activa createdAt y updatedAt
});

// Job.associate = function(models) {
//   Job.belongsToMany(models.Invoice, {
//     through: InvoiceJob,    // Tabla intermedia
//     foreignKey: 'job_id',    // Llave foránea de Job
//     otherKey: 'invoice_id', // Llave foránea de Invoice
//   });
// };
export default Payments;
