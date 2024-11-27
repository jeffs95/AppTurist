// server.js
const express = require('express');
const sequelize = require('./config/database');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const sitioRoutes = require('./routes/sitioRoutes'); // Importar rutas de sitios turísticos

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/sitios', sitioRoutes); // Agregar rutas de sitios turísticos

// Prueba de conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.log('Error de conexión a la base de datos:', error));

// Sincronización de modelos con la base de datos
sequelize.sync()
  .then(() => console.log('Tablas creadas correctamente en la base de datos'))
  .catch((error) => console.log('Error al crear tablas:', error));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
