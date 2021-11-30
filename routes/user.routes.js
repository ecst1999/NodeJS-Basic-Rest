
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarCampos, 
    validarJWT,
    tieneRole,
    esAdminRole
 } = require('../middlewares');

const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');


const { usuariosGet,
        usuariosPut,
        usuariosPost,        
        usuariosDelete,
        usuariosPatch } = require('../controllers/user.controller');


const router = Router();


router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener mas de 6 caracteres').isLength({min:6}),    
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;