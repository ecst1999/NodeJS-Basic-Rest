
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener mas de 6 caracteres').isLength({min:6}),  
    check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE ']),
    validarCampos
],usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;