
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria } = require('../controllers/categorias.controller');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();


/**
 * baseURL/api/categoria 
*/

//Obtener todas las categorias
router.get('/', obtenerCategorias);

//Obtener una categoria por id
router.get('/:id', obtenerCategoria);


// Crear una categoria - Debe ser con login token  
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar mediante ID - Debe ser con login token
router.put('/:id', actualizarCategoria);

//Borrar una categoria - solo rol de admin
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'DELETE'
    });
});

module.exports = router;