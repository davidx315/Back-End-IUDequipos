const { Router } = require('express');
const { getEstados, getEstadoById, createEstado, updateEstadoById } = require('../controllers/estadoEquipoController');
const router = Router();

/** 
 * Obtiene todos los estados de Equipos Activos
*/
router.get('/', getEstados);

/** 
 * Obtiene un estado de Equipo por id
*/
router.get('/:id', getEstadoById);

/** 
 * Crear un Estado de Equipos
*/
router.post('/', createEstado);

/** 
 * Actualizar un Estado de Equipos por id
*/
router.put('/:id', updateEstadoById);

/** 
 * Borrar un Equipos
*/
//router.delete('/:id', deleteTipoEquipoById);


module.exports = router;