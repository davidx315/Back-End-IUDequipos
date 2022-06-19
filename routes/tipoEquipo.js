const { Router } = require('express');
const { getTiposEquipos, getTiposEquiposUsuarioActivo, getTiposEquiposById, crearTipoEquipo, updateTipoEquipoById, deleteTipoEquipoById } = require('../controllers/tipoEquipoController');
const router = Router();

/** 
 * Obtiene todos los tipos de Equipos
*/
router.get('/', getTiposEquipos);

/** 
 * Obtiene todos los tipos de Equipos por el estado activo
*/
router.get('/user-activo', getTiposEquiposUsuarioActivo);

/** 
 * Obtiene un tipos de Equipos por id
*/
router.get('/:id', getTiposEquiposById);

/** 
 * Crear un tipos de Equipos
*/
router.post('/', crearTipoEquipo);

/** 
 * Actualizar un tipos de Equipos por id
*/
router.put('/:id', updateTipoEquipoById);

/** 
 * Actualizar una parte del tipos de Equipos
*/
router.patch('/:id', (req, res) => {
    res.json({});
});

/** 
 * Borrar un Equipos
*/
router.delete('/:id', deleteTipoEquipoById);


module.exports = router;