console.log('El server Funciona :v []')

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
//Importar los archivos de Rutas

import indexRoutes from './routes/indexRoutes'
import gamesRoutes from './routes/gamesRoutes'

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }//Configurar el puerto que va a escuchar.
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }
    //Inicializo las rutas
    routes():void{
        this.app.use(indexRoutes);
        this.app.use('/api/games',gamesRoutes);
    }
    //Inicializo el servidor
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('El server corre en el puerto: ',this.app.get('port'))
        })
    }
}


const server = new Server();
server.start();