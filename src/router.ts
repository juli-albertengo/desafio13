import express, {Application, Request, Response} from 'express';
import {Productos} from './productos';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = express.Router();

const productos = new Productos([{id:1, title: 'Escuadra', price: 233, thumbnail: 'urlImagen'}]);

router.get('/productos', (req:Request, res:Response) => {
    let productosListados = productos.getAllProducts();
    res.json(productosListados);
})

router.get('/productos/:id', (req:Request, res:Response) => {
    const {id} = req.params;
    let numberId = Number(id);
    let producto = productos.findProductById(numberId);
    res.json(producto);
})

router.post('/productos', (req:Request, res:Response) => {
    const {id, title, price, thumbnail} = req.body;
    const producto = {
        id,
        title,
        price,
        thumbnail
    }
    let productoIncorporado = productos.addProduct(producto);
    res.json(productoIncorporado);
})

router.put('/productos/:id', (req:Request, res:Response) => {
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    const productoActualizado = {
        title,
        price,
        thumbnail
    }
    let numberId = Number(id);
    let finalProduct = productos.actualizarProduct(numberId, productoActualizado);
    res.json(finalProduct);
})

router.delete('/productos/:id', (req:Request, res:Response) => {
    const {id} = req.params;
    let numberId = Number(id);
    let productoBorrado = productos.deleteProduct(numberId);
    res.json(productoBorrado);
})

export default router;