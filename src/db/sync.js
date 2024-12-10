const sequelize = require('./instance/connection');
const User = require('./models/user.model');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Sincroniza el modelo con la base de datos
    await sequelize.sync({ alter: true }); // Usa `alter: true` para modificar tablas existentes
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  } finally {
    await sequelize.close();
  }
})();
