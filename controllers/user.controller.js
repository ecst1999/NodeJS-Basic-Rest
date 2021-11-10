const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');


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

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const {nombre, correo, password, rol } = req.body;

    const usuario = new Usuario( {nombre, correo, password, rol} );

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    
    if( existeEmail ){
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        });
    }

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

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controller',
        id
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