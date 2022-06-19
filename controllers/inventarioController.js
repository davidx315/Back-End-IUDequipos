const { request, response } = require('express');
const Inventario = require('../models/inventario');
const Usuario = require('../models/usuario');
const Marca = require('../models/marca');
const Estado = require('../models/equipo');
const TipoEquipo = require('../models/tipoEquipo');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { off } = require('../models/marca');


/**
 * Consultar todos inventarios
 */
 const getInventarios = async (req, res = response) => {
    try{
        const query = {};
        const inventariosBD = await Inventario.find(query)
        .populate({
            path: 'usuario',
            match: { estado: true }
        })
        .populate({
            path: 'marca',
            match: { estado: true }
        });
        res.json(inventariosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar inventario por id
 */
 const getInventarioByID = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const query = { _id: id};
        const inventarioBD = await Inventario.findOne(query).populate({
            path: 'usuario',
            match: { estado: true }
        });
        // TODO: personalizar error de no encontrado
        res.json(inventarioBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * crea un inventario
 */
 const createInventario = async (req = request, res = response) => {
    try{
        const { serial, modelo, usuario, marca, estado, tipoEquipo } = req.body;

        const inventarioBD = await Inventario.findOne({
            $or: [
                {serial : serial}, {modelo : modelo}
            ]
        });
        if(inventarioBD){
            return res.status(400).json({
                msj: 'Ya existe serial o modelo'
            })
        }
        const usuarioBD = await Usuario.findOne({
            _id: usuario, estado: true
        })
        if(!usuarioBD){
            return res.status(400).json({
                msj: 'No existe usuario'
            })
        }
        const marcaBD = await Marca.findOne({
            _id: marca, estado: true
        });
        if(!marcaBD)
        {
            console.log('No existe Marca o no esta activa');
            return res.status(404).json({msg: 'No existe Marca o no esta activa'});
        }
        const estadoEquipo = await Estado.findOne({
            _id: estado, estado: true
        });
        if(!estadoEquipo)
        {
            console.log('No existe estado o no esta activa');
            return res.status(404).json({msg: 'No existe estado o no esta activa'});
        } 
        const tipo = await TipoEquipo.findOne({
            _id: tipoEquipo, estado: true
        });
        if(!tipo)
        {
            console.log('No existe estado o no esta activa');
            return res.status(404).json({msg: 'No existe estado o no esta activa'});
        }    

        const data = req.body;
        const inventario = new Inventario(data);
        await inventario.save();
        res.status(201).json(inventario);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * Actualizar Inventario
 */
const updateInventario = async (req = request, res = response) => {
    try{

        const { id, serial, modelo, usuario, marca, estado, tipoEquipo } = req.params;
        //const { id } = req.params;
        const data = req.body;// destructuring, spread (...)
    
        // TODO: VALIDAR QUE EXISTEN Y ESTAN ACTIVOS: ESTADO, USUARIO, MARCA, ...

        const inventarioBD = await Inventario.findOne({ _id: id}); 
       if(!inventarioBD){
        return res.status(400).json({
            msj: 'No existe este inventario'
        });
       } 

    //    const usuarioBD = await Usuario.findOne({
    //         _id: usuario, estado: true
    //     })
    //     if(!usuarioBD){
    //     return res.status(400).json({
    //         msj: 'No existe usuario'
    //     })
    //     }
    //     const marcaBD = await Marca.findOne({
    //         _id: marca, estado: true
    //     });
    //     if(!marcaBD)
    //     {
    //         console.log('No existe Marca o no esta activa');
    //         return res.status(404).json({msg: 'No existe Marca o no esta activa'});
    //     }
    //     const estadoEquipo = await Estado.findOne({
    //         _id: estado, estado: true
    //     });
    //     if(!estadoEquipo)
    //     {
    //         console.log('No existe estado o no esta activa');
    //         return res.status(404).json({msg: 'No existe estado o no esta activa'});
    //     } 
    //     const tipo = await TipoEquipo.findOne({
    //         _id: tipoEquipo, estado: true
    //     });
    //     if(!tipo)
    //     {
    //         console.log('No existe estado o no esta activa');
    //         return res.status(404).json({msg: 'No existe estado o no esta activa'});
    //     }  
        
        const inventario = await Inventario.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(inventario);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * Actualizar Imagen Inventario
 */
 const uploadImage = async (req = request, res = response) => {
    const { id } = req.params;
    const invBD = await Inventario.findOne({ _id: id});
    if(!invBD){
        return res.status(400).json({
            msj: 'No existe en inventario'
        });
    }
    if(!req.files || Object.keys(req.files) == 0 || !req.files.foto){
        return res.status(400).json({
            msj: 'No se está subiendo una foto'
        });
    }
    const foto = req.files.foto;
    // validamos extensiones
    const extensionesAceptadas = ['jpg', 'jpeg', 'png', 'gif'];
    const arrayExtension = foto.name.split('.');
    const extension = arrayExtension[arrayExtension.length - 1];
    if(!extensionesAceptadas.includes(extension)){
        return res.status(400).json({
            msj: 'Extension no aceptada'
        });
    }
    const nombreTemp = `${uuidv4()}.${extension}`;
    const rutaSubida = path.join(__dirname, '../uploads', nombreTemp);
    //uploads/dadasdasdada.jpg
    foto.mv(rutaSubida, e => {
        if(e){
            return res.status(500).json({ error: e});
        }
    });
    const data = {};
    data.foto = nombreTemp;
    const inv = await Inventario.findByIdAndUpdate(id, data, {new : true});
    if(!inv){
        return res.status(400).json({ error: 'Error al actualizar'});
    }
    res.status(201).json({msj: 'Se subió la foto'});
}

/**
 * Lee la foto del Inventario por id
 */
const getFotoById = async (req = request, res = response) => {
    const { id } = req.params;
    const inventarioBD = await Inventario.findOne({_id:id});
    if(!inventarioBD){
        return res.status(400).json({ error:  'No existe en el Inventario'});
    }
    const nombreFoto = inventarioBD.foto;
    const rutaImagenesSubidas = path.join(__dirname, '../uploads', nombreFoto);
    if (fs.existsSync(rutaImagenesSubidas)) {
        res.sendFile(rutaImagenesSubidas);
    }
}

module.exports = { getInventarios, getInventarioByID, createInventario, updateInventario, uploadImage, getFotoById};