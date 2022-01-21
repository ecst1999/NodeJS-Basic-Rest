
const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol) {
        throw new Error(`El rol ${rol} no existe en la BD`);
    }
}

const existeEmail = async (correo = '') => {  
    
    const existeEmail = await Usuario.findOne({ correo });

    if( existeEmail ){
        throw new Error(`El email ${correo} ya existe en la BD`);        
    }

}

const existeUsuarioPorId = async ( id ) => {

    const existeUsuario = await Usuario.findById( id );

    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCategoriaId = async (id) => {
    
    const existeCategoria = await Categoria.findById( id );

    if(!existeCategoria){
        throw new Error(`El id no existe ${id}`);
    }

}

const existeProductoID = async (id) => {
    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Validar colecciones permitidas 
*/
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaId,
    existeProductoID,
    coleccionesPermitidas
}