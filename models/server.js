//Servidor de Express
const express = require('express');
//servidor de socket
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');
const { dbConnection } = require('../db/dbConfig');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);

        //Configuración del socket server
        this.io = socketio(this.server, {
            /* Configuraciones */
        });
    }

    middlewares() {
        //Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../', 'public')));

        //CORS
        this.app.use(cors());

    }

    //Conectar base de datos
    async dbConnection() {
        await dbConnection();
    }

    configSockets() {
        new Sockets(this.io);
    }

    execute() {

        //Inicializar middlewares
        this.middlewares();

        //Inicializar DB
        this.dbConnection();

        //Inicializar sockets
        this.configSockets();

        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log(`Servidor on, url: http://localhost:${this.port}`);
        });
    }


}

module.exports = Server;