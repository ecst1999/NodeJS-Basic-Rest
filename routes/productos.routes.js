const { Router } = require('express');
const { check } = require('express-validator');
const { crearProductos, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
const { existeProductoID } = require('../helpers/db-validators');

const {
    validarJWT, validarCampos, tieneRole
} = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatorio').not().isEmpty(),
    validarCampos
],crearProductos);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos
], actualizarProducto);

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es valido el ID').isMongoId()
] ,borrarProducto)

module.exports = router;