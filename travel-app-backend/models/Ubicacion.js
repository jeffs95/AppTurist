// models/Ubicacion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DestinoTuristico = require('./DestinoTuristico');

const Ubicacion = sequelize.define('Ubicacion', {
  idUbicacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  latitud: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  },
  longitud: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  },
  idDestinoTuristico: {
    type: DataTypes.INTEGER,
    references: {
      model: DestinoTuristico,
      key: 'idDestinoTuristico',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'ubicacion',
  timestamps: false,
});

module.exports = Ubicacion;
