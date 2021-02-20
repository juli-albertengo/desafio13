import express, {Application, Request, Response} from 'express';
import router from './router';
import path from 'path'
import {productos} from './productos';
import { allowedNodeEnvironmentFlags } from 'process';

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

io.on('connection', (socket:any) => {

    socket.emit('recibirProductos', productos)

    socket.on('productoAgregado', (producto:any)=> {
        productos.addProduct(producto);
        io.emit('productoAgregado', producto);
    })
})

app.use('/api', router);

