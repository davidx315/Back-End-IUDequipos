const { request, response } = require('express');
const  TipoEquipo  = require('../models/tipoEquipo');
const Usuario = require('../models/usuario');

/**
 * Consulta todos los tipos de Equipos
 */
const getTiposEquipos = async (req, res) => {

    // const query = {estado: true};
    const query = {};
    const tipoEquipoBD = await TipoEquipo.find(query)        
    .populate({
        path: 'usuario',
        match: { estado: true }
    });
    res.json(tipoEquipoBD);
}

/**
 *  Consultar tipo Equipo por id
 */
const getTiposEquiposById = async (req = request, res = response) => {
    try {
        const id  = req.params.id;
        const query = { _id: id };
        const tipoEquipo = await TipoEquipo.findOne(query);
        res.json(tipoEquipo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});      
    }
}

/**
 * Consulta todos los tipos de Equipos por usuario activo
 */
 const getTiposEquiposUsuarioActivo = async (req, res = response) => {
    try {
        const query = { estado: true } // etado del equipo
        let tipoSEquipoBD = await TipoEquipo.find(query).populate({
            path: 'usuario',
            match : { estado : true }
        });
        tipoSEquipoBD = tipoSEquipoBD.filter(t => t.usuario != null);
        res.json({tipoSEquipoBD});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});    
    }
}

/**
 *  Crear tipo Equipo
 */
 const crearTipoEquipo = async (req = request, res = response) => {
    try {
        const nombre = req.body.nombre.toUpperCase();
        const email = req.body.usuario.email;
        const tipoEquipoBD = await TipoEquipo.findOne({nombre : nombre});
        if(tipoEquipoBD)
        {
            console.log('Ya existe este tipo de equipo');
            return res.status(400).json({msg: 'Ya existe este tipo de equipo'});
        }       
        const usuarioBD = await Usuario.findOne({email: email});
        if(!usuarioBD)
        {
            console.log('No existe Usuario');
            return res.status(404).json({msg: 'No existe Usuario'});
        }       
        const datos = {
            nombre,
            usuario : usuarioBD._id
        };
        const tipoEquipo = new TipoEquipo(datos);  
        await tipoEquipo.save();        
        res.status(201).json(tipoEquipo);

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});      
    }
}

/**
 * Actualizar un tipo de equipo por su id
 */
const updateTipoEquipoById = async (req = request, res = response) => {
    try {
        const { id }  = req.params;
        const { nombre, ...data } = req.body; // destructuringm, spread (...)

        const usuarioBD = await Usuario.findOne({email : data.usuario.email});
        if(!usuarioBD){
            return res.status(404).json({msg: 'No existe usuario'});
        }
        data.usuario = usuarioBD._id;
        const tipoEquipoBD = await TipoEquipo.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(tipoEquipoBD);

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});    
          
    }
}

/**
 * Borrar un tipo de equipo por su id
 */
 const deleteTipoEquipoById = async (req = request, res = response) => {
    try {
        const id  = req.params.id;
        const tipoEquipoBD = await TipoEquipo.findByIdAndDelete(id);
        res.status(204).json(tipoEquipoBD);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: error});    
    }
 }

module.exports = { getTiposEquipos, getTiposEquiposUsuarioActivo, getTiposEquiposById, crearTipoEquipo, updateTipoEquipoById, deleteTipoEquipoById };