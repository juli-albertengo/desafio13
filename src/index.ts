import express, {Application, Request, Response} from 'express';
import router from './router';
import path from 'path'
import {productos} from './productos';
import { mensajes } from './mensajes';

const app:Application = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

http.listen('8080', () => {
    console.log('App is listening on port 8080');
})

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
})

//Desafio clase 13
io.on('connection', async(socket:any) => {
    let msjes = await mensajes.getAllMensajes()
    socket.emit('recibirMensajes', msjes)

    socket.on('nuevoMensaje', (mensaje:any)=> {
        mensajes.addMensaje(mensaje);
        io.emit('nuevoMensaje', mensaje);
    })
})



//Desafio clase 12
io.on('connection', (socket:any) => {

    socket.emit('recibirProductos', productos)

    socket.on('productoAgregado', (producto:any)=> {
        productos.addProduct(producto);
        io.emit('productoAgregado', producto);
    })
})

app.use('/api', router);

