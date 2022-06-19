const { Router } = require('express');
const {crearUsuario, getUsuarios, getUsuariosActivos } = require('../controllers/usuarioController');

const router = Router();

/** 
 * Obtiene todos los usuarios
*/
router.get('/', getUsuarios);

/** 
 * Obtiene todos los usuarios activos
*/
router.get('/usuarios-Activos', getUsuariosActivos);

/** 
 * Obtiene un usuario por id
*/
router.get('/:id', (req, res) => {
    res.json({});
});

/** 
 * Crear un usuario
*/
router.post('/', crearUsuario);

/** 
 * Actualizar un usuario por id
*/
router.put('/:id', (req, res) => {
    res.json({});
});

/** 
 * Actualizar una parte del usuario
*/
router.patch('/:id', (req, res) => {
    res.json({});
});

/** 
 * Borrar un usuario
*/
router.delete('/:id', (req, res) => {
    res.json({});
});


module.exports = router;