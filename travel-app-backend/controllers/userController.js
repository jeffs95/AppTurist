const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const dotenv = require('dotenv');
dotenv.config();

exports.getUserData = async (req, res) => {
    console.log('[IDUSER] >>', req.params);
    
    try {
        const { idUsuario } = req.params;

        const user = await Usuario.findOne({
            where: { idUsuario },
            attributes: { exclude: ['contrasena'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.registerUser = async (req, res) => {
    console.log("[BODY] >>", req.body);
    try {
        const { nombre, correo, contrasena } = req.body;

        const existingUser = await Usuario.findOne({ where: { correo } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const user = await Usuario.create({
            nombre,
            correo,
            contrasena: hashedPassword
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.loginUser = async (req, res) => {
    // console.log("[BODY] >", req.body);
    try {
        const { correo, contrasena } = req.body;

        const user = await Usuario.findOne({ where: { correo } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.idUsuario }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        console.log("[idUsuario] >>", user.idUsuario );
        
        res.status(200).json({ message: 'Login exitoso', token, idUsuario: user.idUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.updatePassword = async (req, res) => {
    console.log("[BODY] >>", req.body);
    try {
        const { idUsuario, nuevaContrasena, fotoPerfil } = req.body;

        const user = await Usuario.findOne({ where: { idUsuario } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (fotoPerfil) {
            user.fotoPerfil = fotoPerfil;
        }

        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

        user.contrasena = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Contraseña y foto de perfil actualizados exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
