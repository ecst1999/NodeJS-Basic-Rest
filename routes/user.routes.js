
const { Router } = require('express');
const { check } = require('express-validator');

const Role = require('../models/role');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/user.controller');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail } = require('../helpers/db-validators');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener mas de 6 caracteres').isLength({min:6}),  
    check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE ']),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;