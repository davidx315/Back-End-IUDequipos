const { request, response } = require('express');

const Usuario = require('../models/usuario');

/**
 * Consulta todos los usuarios
 */
 const getUsuarios = async (req, res) => {

    const query = {};
    const usuarioBD = await Usuario.find(query);
    res.json({usuarioBD});
}

/**
 * Consultar todos los usuarios activos
 */
 const getUsuariosActivos = async (req, res = response) => {
    try{
        const query = { estado: true};
        const usuariosBD = await Usuario.find(query);
        res.json(usuariosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 *  Crear Usuarios
 */
const crearUsuario = async (req = request, res = response) => {
    try {
        const body = req.body;
        const usuario = new Usuario(body);
        await usuario.save();
        console.log(body);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});      
    }
}

module.exports = { crearUsuario, getUsuarios, getUsuariosActivos };