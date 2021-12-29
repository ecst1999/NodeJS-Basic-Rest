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

const obtenerCategorias = async(req = request, res = response) => {

    const { limite = 5, page = 1 } = req.query;
    const query = {estado: true};

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .limit(Number(limite))
    ]);

    res.json({
        total, 
        categorias
    })

}

const obtenerCategoria = async(req = request, res = response) => {
    
    const { id } = req.params;

    const categoria = await Categoria.findById(id);

    res.json({
        categoria
    });

}

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

const actualizarCategoria = async(req = request, res = response) => {
    
    const { id } = req.params;
    const nombreAct = req.body.nombre.toUpperCase();

    console.log(id);
    

    const categoriaActualizada = await Categoria.findByIdAndUpdate( id, nombreAct);

    res.json( categoriaActualizada );
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria
}