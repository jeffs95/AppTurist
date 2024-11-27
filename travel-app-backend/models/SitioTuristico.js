// models/SitioTuristico.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SitioTuristico = sequelize.define('sitioTuristicos', {
    idSitio: {
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
    puntuacion: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 5,
        },
    },
    reseñas: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'sitioTuristicos',
    timestamps: false,
});

module.exports = SitioTuristico;
