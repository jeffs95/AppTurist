// models/DestinoTuristico.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DestinoTuristico = sequelize.define('DestinoTuristico', {
  idDestinoTuristico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.BLOB,
  },
}, {
  tableName: 'destinoTuristico',
  timestamps: false,
});

module.exports = DestinoTuristico;
