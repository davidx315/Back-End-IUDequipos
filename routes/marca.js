const { Router } = require('express');
const { getMarcas, getMarcaById, createMarca, updateMarcaById } = require('../controllers/marcaController');
const router = Router();

/** 
 * Obtiene todos las Marca Activas
*/
router.get('/', getMarcas);

/** 
 * Obtiene una Marca por id
*/
router.get('/:id', getMarcaById);

/** 
 * Crear un Marca
*/
router.post('/', createMarca);

/** 
 * Actualizar unq Marca por id
*/
router.put('/:id', updateMarcaById);

/** 
 * Borrar un Equipos
*/
//router.delete('/:id', deleteTipoEquipoById);


module.exports = router;