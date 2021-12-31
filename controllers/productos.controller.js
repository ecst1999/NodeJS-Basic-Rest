const { request, response } = require('express');
const Producto = require('../models/producto');

const crearProductos = async (req = request, res =response)  => {

    const { estado, usuario, nombre, precio, descripcion, categoria } = req.body;
    
    const data = {
        nombre, 
        precio,
        descripcion,
        categoria,
        usuario: req.usuario._id
    }

    const productoDB = await Producto.findOne({nombre});

    if(productoDB){

        res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });

    }

    const producto = new Producto( data );
    //Guardar en DB
    await producto.save();

    res.json({
        msg: 'Se creo el producto con exito en la BD',
        producto
    });
}

const obtenerProductos = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        productos
    })
}

const obtenerProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json({
        producto
    });

}

const actualizarProducto = async(req = request, res = response) => {
    
    const { id } = req.params;
    const { nombre, precio, descripcion, categoria } = req.body;

    const data = {
        nombre,
        precio,
        descripcion,
        categoria,
        usuario : req.usuario._id
    }

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json({
        producto
    });
    

}

const borrarProducto = async(req = request, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado: false});

    res.json({
        producto
    });

}

module.exports = {
    crearProductos,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}