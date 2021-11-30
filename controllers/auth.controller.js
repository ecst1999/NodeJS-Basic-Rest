const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res = response ) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el email existe 
        const usuario = await Usuario.findOne({ correo });

        if(!usuario){
            return res.status(400).json({
                msg: 'Usarios / Password no son correctos - Mail'
            });
        }

        //Si el usuario esta activo

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usarios / Password no son correctos - Mail False'
            });
        }

        //Verificar la clave

        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usarios / Password no son correctos - Password '
            });
        }

        //Generar JWT

        const token = await generarJWT( usuario.id );

        res.json({
            msj: 'Login - OK',
            token,
            usuario  
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Hable con el administrador del API'
        });
    }

    

}

module.exports = {
    login
}