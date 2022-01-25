const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos, validarArchivo } = require('../middlewares');

const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),    
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'El id debe ser de mongo').isMongoId(),    
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
// ], actualizarImagen);
 ], actualizarImagenCloudinary);

module.exports = router;