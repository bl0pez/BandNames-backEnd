const BandList = require('./band-list');
class Sockets {
    constructor(io) {
        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        //On connection
        this.io.on('connection', async (socket) => {
            console.log("Client connected", socket.id);
            //Emitir al cliente conectado, todas las bandas actuales
            socket.emit('current-bands', await this.bandList.getBands());

            //Votar por la banda
            socket.on('votar-banda', async(id) => {
                await this.bandList.increaseVotes(id);
                //this.io es para emitir a todos los clientes conectados
                this.io.emit('current-bands', await this.bandList.getBands());
            });

            //Borrar banda
            socket.on('borrar-banda', async(id) => {
                await this.bandList.removeBand(id);
                this.io.emit('current-bands', await this.bandList.getBands());
            });

            //Cambiar nombre de la banda
            socket.on('cambiar-nombre-banda', async({ id, nombre }) => {
                await this.bandList.changeName(id, nombre);
                this.io.emit('current-bands', await this.bandList.getBands());
            });

            //Crear nueva banda
            socket.on('crear-banda', async({ nombre }) => {
                await this.bandList.addBand(nombre);
                this.io.emit('current-bands', await this.bandList.getBands());
            });

        });
    }

}


module.exports = Sockets;