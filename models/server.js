const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.pathsRoutes = {
            auth: '/api/auth',
            buscar: '/api/buscar/',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        }                        

        // Conectar a DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
        
        // Directorio Publico
        this.app.use(express.static('public'));

    }

    routes(){

        this.app.use(this.pathsRoutes.auth, require('../routes/auth.routes'));
        this.app.use(this.pathsRoutes.buscar, require('../routes/busqueda.routes'));
        this.app.use(this.pathsRoutes.categorias, require('../routes/categorias.routes'));
        this.app.use(this.pathsRoutes.productos, require('../routes/productos.routes'));
        this.app.use(this.pathsRoutes.usuarios, require('../routes/user.routes'));


    }

    listen(){         
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo puerto ${this.port}`);
        });
    }

}

module.exports = Server;