
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { existeCategoriaId } = require('../helpers/db-validators');

const { 
    validarCampos, 
    validarJWT,
    tieneRole    
 } = require('../middlewares');

const router = Router();


/**
 * baseURL/api/categoria 
*/

//Obtener todas las categorias
router.get('/', obtenerCategorias);

//Obtener una categoria por id
router.get('/:id', [    
    check('id', 'No es un ID valido').isMongoId()    
], obtenerCategoria);


// Crear una categoria - Debe ser con login token  
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar mediante ID - Debe ser con login token
router.put('/:id', [
    validarJWT,        
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], actualizarCategoria);

//Borrar una categoria - solo rol de admin
router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId()    
], borrarCategoria);

module.exports = router;