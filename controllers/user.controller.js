const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit} = req.query;

    res.json({
        msg: 'get API - Controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });

}

const usuariosPost = async(req, res = response)  => {
    
    const {nombre, correo, password, rol } = req.body;

    const usuario = new Usuario( {nombre, correo, password, rol} );

    //Encriptar Clave
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //Guardar BD 
    await usuario.save();
    
    res.status(201).json({
        msg: 'post API - Controller',
        usuario
    });

}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;

    const { password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos 
    if( password ){
        //Encriptar Clave
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuarioDB
    });

}

const usuariosPatch = (req, res = response) => {

    res.status(200).json({
        msg: 'patch API - Controller'
    });

}

const usuariosDelete = (req, res = response) => {

    res.status(200).json({
        msg: 'delete API - Controller'
    });

}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}