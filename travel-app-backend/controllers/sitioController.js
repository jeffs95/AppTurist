// controllers/sitioController.js
const SitioTuristico = require('../models/SitioTuristico');

// Crear un nuevo sitio turístico
exports.createSitio = async (req, res) => {
    console.log("[createSitio]");
    try {
        const { nombre, descripcion, puntuacion, reseñas } = req.body;

        // Crear el sitio turístico
        const sitio = await SitioTuristico.create({
            nombre,
            descripcion,
            puntuacion,
            reseñas,
        });

        res.status(201).json({ message: 'Sitio turístico creado exitosamente', sitio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todos los sitios turísticos
exports.getAllSitios = async (req, res) => {
    console.log("[getAllSitios]");
    try {
        const sitios = await SitioTuristico.findAll();
        res.status(200).json(sitios);
        console.log("[Sitios] >>", sitios);
    } catch (error) {
        console.error("[ERROR] >>", error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener un sitio turístico por ID
exports.getSitioById = async (req, res) => {
    try {
        const { id } = req.params;

        const sitio = await SitioTuristico.findByPk(id);
        if (!sitio) {
            return res.status(404).json({ message: 'Sitio turístico no encontrado' });
        }

        res.status(200).json(sitio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar un sitio turístico
exports.updateSitio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, puntuacion, reseñas } = req.body;

        const sitio = await SitioTuristico.findByPk(id);
        if (!sitio) {
            return res.status(404).json({ message: 'Sitio turístico no encontrado' });
        }

        // Actualizar el sitio turístico
        await sitio.update({ nombre, descripcion, puntuacion, reseñas });
        res.status(200).json({ message: 'Sitio turístico actualizado', sitio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar un sitio turístico
exports.deleteSitio = async (req, res) => {
    try {
        const { id } = req.params;

        const sitio = await SitioTuristico.findByPk(id);
        if (!sitio) {
            return res.status(404).json({ message: 'Sitio turístico no encontrado' });
        }

        // Eliminar el sitio turístico
        await sitio.destroy();
        res.status(200).json({ message: 'Sitio turístico eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
