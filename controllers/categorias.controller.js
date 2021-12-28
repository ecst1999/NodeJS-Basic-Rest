const { response, request } = require("express");
const { Categoria } = require('../models');


//TODO
/**
 * obtenerCategorias - paginado - total - Utilizar metodo populate 
 * obtenerCategoria - populate { objeto de categoria }
 * actualizarCategoria - mediante nombre 
 * borrarCategoria - estado: false
 * validarId mediante middleware personalizado
 * db-validators - existeCategoria
*/

const crearCategoria = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoria_DB = await Categoria.findOne({nombre});

    if(categoria_DB){

        res.status(400).json({
            msg: `La categoria ${categoria_DB.nombre} ya existe` 
        });

    }

    //Generar la data a guardar 

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    
    //Guardar DB 
    await categoria.save();

    res.status(201).json({
        msg: 'Se guardo de forma correcta',
        categoria
    });

}

module.exports = {
    crearCategoria
}